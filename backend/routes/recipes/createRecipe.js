const db = require("../../db");
const keys = require("../../config/keys");
const { convertTimeToMin, splitIngredientStr } = require("../../utils");

module.exports = async ({ user: { user_id }, body: recipe }, res) => {
  const ingredients = splitIngredientStr(recipe.ingredients);

  const keywords = recipe.keywords
    .toString()
    .split(",")
    .map(item => item.trim());

  try {
    const {
      rows: [{ recipe_id }]
    } = await db.query(
      `INSERT INTO "RECIPES"
       VALUES (
          DEFAULT,
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          DEFAULT,
          NOW()
        )
         RETURNING recipe_id;`,
      [
        recipe.title,
        recipe.image_url,
        convertTimeToMin(recipe.time),
        recipe.servings,
        recipe.instructions,
        recipe.footnote
      ]
    );

    let ingredientValues = [];

    ingredients.forEach((ingredient, i) => {
      ingredientValues.push(
        `(${recipe_id}, '${ingredient.amount}', '${ingredient.ingredient}', ${i})`
      );
    });

    let categoryValues = [];

    recipe.categories.forEach(category => {
      categoryValues.push(`(${recipe_id}, '${category}')`);
    });

    let keywordValues = [];

    keywords.forEach(keyword => {
      keywordValues.push(`('${keyword}', to_tsvector('${keyword}'))`);
    });

    let recipesKeywordsValues = [];

    keywords.forEach((keyword, i) => {
      recipesKeywordsValues.push(`('${keyword}', ${recipe_id}, ${i})`);
    });

    await db.query(
      `BEGIN;
       INSERT INTO "INGREDIENTS" VALUES ${ingredientValues.join()};
       INSERT INTO "RECIPES_CATEGORIES" VALUES ${categoryValues.join()};
       INSERT INTO "KEYWORDS" VALUES ${keywordValues.join()}
                       ON CONFLICT (keyword) DO NOTHING;
       INSERT INTO "RECIPES_KEYWORDS" VALUES ${recipesKeywordsValues.join()};
       COMMIT;`
    );

    await db.query(
      `INSERT INTO "RECIPES_SEARCHES"
    VALUES ($1, setweight(to_tsvector($2::VARCHAR), 'A')
                || setweight(to_tsvector($3::VARCHAR), 'C')
                || setweight(to_tsvector(array_to_string($4::VARCHAR[], ' ')), 'B')
            );`,
      [recipe_id, recipe.title, recipe.instructions, keywords]
    );

    await db.query(`INSERT INTO "USERS_RECIPES" VALUES ($1, $2);`, [
      recipe_id,
      user_id
    ]);

    res.status(200).send({ recipe_id: recipe_id });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
