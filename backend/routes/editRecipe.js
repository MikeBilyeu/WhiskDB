const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
const { convertTimeToMin } = require("../utils");
module.exports = router;

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const {
      recipe_id,
      created_by,
      servings,
      ingredients,
      directions,
      footnote,
      categories,
      keywords
    } = request.body;

    const recipeData = [
      request.body.title.trim(),
      servings,
      ingredients,
      directions,
      footnote,
      categories,
      keywords,
      convertTimeToMin(request.body.time),
      recipe_id
    ];

    const { user_id } = request.user; // Get user_id from auth
    if (user_id !== created_by) {
      response.status(401).send("You can't edit this recipe");
    }

    try {
      await db.query(
        `UPDATE recipes
       SET title = $1, servings = $2, ingredients = $3, directions = $4,
        footnote = $5, categories = $6, keywords = $7, total_time_mins = $8
       WHERE recipe_id = $9`,
        recipeData
      );
      response.status(200).send("Changes saved!");
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
