const db = require("../../db");
const { convertTimeToMin, splitIngredientStr } = require("../../utils");

module.exports = async ({ user, body: recipe }, res) => {
  const {
    rows: [{ author }]
  } = await db.query(
    `SELECT user_id IS NOT NULL AS author
    FROM "USERS_RECIPES"
    WHERE user_id = $1
      AND recipe_id = $2;`,
    [user.user_id, recipe.recipe_id]
  );

  if (!author) {
    res.status(401).send("You can't edit this recipe");
    return;
  }

  const ingredients = recipe.ingredients
    .split(/\n/)
    .map(ing => splitIngredientStr(ing));

  console.log(recipe.keywords);

  const keywords = recipe.keywords.split(",").map(item => item.trim());

  let ingredientValues = [];

  ingredients.forEach((ingredient, i) => {
    ingredientValues.push(
      `(${recipe.recipe_id}, '${ingredient.amount}', '${ingredient.ingredient}', ${i})`
    );
  });

  let categoryValues = [];

  recipe.categories.forEach(category => {
    categoryValues.push(`(${recipe.recipe_id}, '${category}')`);
  });

  let keywordValues = [];

  keywords.forEach(keyword => {
    keywordValues.push(`('${keyword}', to_tsvector('${keyword}'))`);
  });

  let recipesKeywordsValues = [];

  keywords.forEach((keyword, i) => {
    recipesKeywordsValues.push(`('${keyword}', ${recipe.recipe_id}, ${i})`);
  });

  const editQuery = `
  BEGIN;
  DELETE FROM "RECIPES_CATEGORIES"
  WHERE recipe_id = ${recipe.recipe_id};

  INSERT INTO "RECIPES_CATEGORIES" VALUES ${categoryValues.join()};

  DELETE FROM "INGREDIENTS"
  WHERE recipe_id = ${recipe.recipe_id};

  INSERT INTO "INGREDIENTS" VALUES ${ingredientValues.join()};

  DELETE FROM "RECIPES_KEYWORDS"
  WHERE recipe_id = ${recipe.recipe_id};

  INSERT INTO "KEYWORDS" VALUES ${keywordValues.join()}
                  ON CONFLICT (keyword) DO NOTHING;

  INSERT INTO "RECIPES_KEYWORDS" VALUES ${recipesKeywordsValues.join()};

  DELETE FROM "RECIPES_SEARCHES"
  WHERE recipe_id = ${recipe.recipe_id};

  COMMIT;`;

  try {
    await db.query(
      `UPDATE "RECIPES"
    SET title = $1,
        image_url = $2,
        total_time = $3,
        servings = $4,
        instructions = $5,
        footnote = $6,
        updated_at = NOW()
    WHERE recipe_id = $7;`,
      [
        recipe.title.trim(),
        recipe.image_url,
        convertTimeToMin(recipe.time),
        recipe.servings,
        recipe.instructions,
        recipe.footnote,
        recipe.recipe_id
      ]
    );

    await db.query(editQuery);

    await db.query(
      `INSERT INTO "RECIPES_SEARCHES"
      VALUES ($1, setweight(to_tsvector($2::VARCHAR), 'A')
                || setweight(to_tsvector($3::VARCHAR), 'C')
                || setweight(to_tsvector(array_to_string($4::VARCHAR[], ' ')), 'B')
            );`,
      [recipe.recipe_id, recipe.title, recipe.instructions, keywords]
    );

    res.status(200).send("Changes saved!");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
