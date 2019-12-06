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

    try {
      await db.query(
        `UPDATE recipes
       SET title = $1, servings = $2, ingredients = $3, directions = $4,
        footnote = $5, categories = $6, keywords = $7, total_time_mins = $8
       WHERE recipe_id = $9`,
        [
          recipe.title.trim(),
          recipe.servings,
          recipe.ingredients,
          recipe.directions,
          recipe.footnote,
          recipe.categories,
          recipe.keywords,
          convertTimeToMin(recipe.time),
          recipe.recipe_id
        ]
      );
      response.status(200).send("Changes saved!");
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
