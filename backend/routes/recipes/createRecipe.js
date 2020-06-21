const db = require("../../db");
const keys = require("../../config/keys");
const { convertTimeToMin, splitIngredientStr } = require("../../utils");

module.exports = async ({ user: { user_id }, body: recipe }, res) => {
  const ingredients = recipe.ingredients
    .split(/\n/)
    .map(ing => splitIngredientStr(ing));

  const keywords = recipe.keywords
    .toString()
    .split(",")
    .map(item => item.trim());

  try {
    const { rows } = await db.query(
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
    const recipe_id = rows[0].recipe_id;

    let ingredientValues = [];

    ingredients.forEach((ingredient, i) => {
      ingredientValues.push(
        `(${recipe_id}, '${ingredient.amount}', '${ingredient.ingredient}', ${i})`
      );
    });

    await db.query(
      `INSERT INTO "INGREDIENTS" VALUES ${ingredientValues.join()};`
    );

    let categoryValues = [];

    recipe.categories.forEach(category => {
      categoryValues.push(`(${recipe_id}, '${category}')`);
    });

    await db.query(
      `INSERT INTO "RECIPES_CATEGORIES" VALUES ${categoryValues.join()};`
    );

    let keywordValues = [];

    keywords.forEach(keyword => {
      keywordValues.push(`('${keyword}', to_tsvector('${keyword}'))`);
    });

    await db.query(`INSERT INTO "KEYWORDS" VALUES ${keywordValues.join()}
                    ON CONFLICT (keyword) DO NOTHING;`);

    let recipesKeywordsValues = [];

    keywords.forEach((keyword, i) => {
      recipesKeywordsValues.push(`('${keyword}', ${recipe_id}, ${i})`);
    });

    await db.query(
      `INSERT INTO "RECIPES_KEYWORDS" VALUES ${recipesKeywordsValues.join()};`
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
