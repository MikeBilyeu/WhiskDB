const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
const { convertTimeToMin } = require("../utils");

// export our router to be mounted by the parent application
module.exports = router;

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async ({ user, body: recipe }, response) => {
    // const errors = validateRecipeInput(recipe);
    // if (Object.keys(errors).length !== 0) {
    //   response.status(400).json(errors);
    // }

    try {
      const { rows } = await db.query(
        `INSERT INTO recipes( created_by, title, servings, total_time_mins,
        footnote, directions, ingredients, keywords, categories, image_url,
        document_vectors ) VALUES ( $1, CAST($2 AS VARCHAR), $3, $4, $5, $6,
        $7, CAST($8 AS VARCHAR[]), $9, $10, ( to_tsvector($2) || to_tsvector(
        array_to_string($8, ' ') ) ) ) RETURNING recipe_id`,
        [
          user.user_id,
          recipe.title.trim(),
          recipe.servings,
          convertTimeToMin(recipe.time),
          recipe.footnote,
          recipe.directions,
          recipe.ingredients,
          recipe.keywords,
          recipe.categories,
          recipe.image_url
        ]
      );

      const recipe_id = rows[0].recipe_id;

      recipe.categories.forEach(category => {
        db.query(
          `INSERT INTO recipes_join_categories (recipe, category)
           VALUES ($1, (SELECT category_id FROM categories
           WHERE category_name = $2))`,
          [recipe_id, category]
        );
      });

      response.status(200).send({ recipe_id: recipe_id });
    } catch (err) {
      response.status(400).json(err);
    }
  }
);