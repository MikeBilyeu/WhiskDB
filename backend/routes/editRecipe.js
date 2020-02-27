const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
const { convertTimeToMin } = require("../utils");
module.exports = router;

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async ({ user, body: recipe }, response) => {
    if (user.user_id !== recipe.created_by) {
      response.status(401).send("You can't edit this recipe");
    }
    const ingredientsArr = recipe.ingredients.split(/\n/);
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
      // Add new categories
      Promise.all(
        recipe.categories.map(async category => {
          await db.query(
            `INSERT INTO recipes_join_categories (recipe, category)
           VALUES ($1, $2)`,
            [recipe.recipe_id, category]
          );
        })
      );

      response.status(200).send("Changes saved!");
    } catch (err) {
      console.error(err);
      response.status(500).json(err);
    }
  }
);
