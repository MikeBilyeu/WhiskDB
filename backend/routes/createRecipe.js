const Router = require("express-promise-router");
const db = require("../db");
const keys = require("../config/keys");
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
    const ingredientsArr = recipe.ingredients
      .split(/\n/)
      .map(ing => {
        return ing.trim().replace(/[ \t]{2,}/, " ");
      })
      .filter(Boolean);
    const keywordsArr = recipe.keywords.split(",").map(item => item.trim());

    try {
      const { rows } = await db.query(
        `INSERT INTO recipes ( created_by, title, servings, total_time_mins,
        footnote, directions, ingredients, keywords, categories, image_url,
        document_vectors ) VALUES ( $1, CAST($2 AS VARCHAR), $3, $4, $5, CAST($6 AS VARCHAR),
        $7, CAST($8 AS VARCHAR[]), $9, $10, ( setweight(to_tsvector($2), 'A')
        || setweight(to_tsvector($6), 'C')  || setweight(to_tsvector(
        array_to_string($8, ' ') ), 'B') ) ) RETURNING recipe_id`,
        [
          user.user_id,
          recipe.title.trim(),
          recipe.servings,
          convertTimeToMin(recipe.time),
          recipe.footnote,
          recipe.directions,
          ingredientsArr,
          keywordsArr,
          recipe.categories,
          recipe.image_url
        ]
      );

      const recipe_id = rows[0].recipe_id;

      Promise.all(
        recipe.categories.map(async category => {
          await db.query(
            `INSERT INTO recipes_join_categories (recipe, category)
           VALUES ($1, $2)`,
            [recipe_id, category]
          );
        })
      );

      response.status(200).send({ recipe_id: recipe_id });
    } catch (err) {
      console.error(err);
      response.status(400).json(err);
    }
  }
);
