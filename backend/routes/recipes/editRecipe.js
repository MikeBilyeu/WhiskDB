const db = require("../../db");
const { convertTimeToMin } = require("../../utils");

module.exports = async ({ user, body: recipe }, res) => {
  if (user.user_id !== recipe.created_by) {
    res.status(401).send("You can't edit this recipe");
  }
  const ingredientsArr = recipe.ingredients
    .split(/\n/)
    .map(ing => {
      return ing.trim().replace(/[ \t]{2,}/, " ");
    })
    .filter(Boolean);
  const keywordsArr = recipe.keywords.split(",").map(item => item.trim());

  try {
    await db.query(
      `UPDATE recipes
       SET title = $1::VARCHAR, servings = $2, ingredients = $3,
       directions = $4::VARCHAR, footnote = $5, categories = $6,
       keywords = CAST($7 AS VARCHAR[]), total_time_mins = $8,
         image_url = $9, document_vectors = ( setweight(to_tsvector($1), 'A')
         || setweight(to_tsvector($4), 'C') || setweight(to_tsvector(array_to_string($7, ' ')), 'B') )
       WHERE recipe_id = $10`,
      [
        recipe.title.trim(),
        recipe.servings,
        ingredientsArr,
        recipe.directions,
        recipe.footnote,
        recipe.categories,
        keywordsArr,
        convertTimeToMin(recipe.time),
        recipe.image_url,
        recipe.recipe_id
      ]
    );

    // Remove categories from recipes_join_categories
    await db.query(
      `DELETE
        FROM recipes_join_categories
        WHERE recipe= $1`,
      [recipe.recipe_id]
    );

    let categoryValues = [];

    recipe.categories.forEach(category => {
      categoryValues.push(`(${recipe.recipe_id}, '${category}')`);
    });

    await db.query(
      `INSERT INTO recipes_join_categories VALUES ${categoryValues.join()};`
    );

    res.status(200).send("Changes saved!");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
