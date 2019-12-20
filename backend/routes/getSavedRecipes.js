const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
module.exports = router;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user;
    try {
      const { rows } = await db.query(
        `SELECT r.recipe_id,
               r.title,
               r.image_url,
               r.total_time_mins,
               COALESCE(AVG(rw.rating), 0) AS rating,
               CAST(count(distinct rw.*) AS INTEGER) AS num_reviews,
               COUNT(distinct sr.*) AS num_saves
        FROM recipes r
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
        WHERE r.recipe_id IN
            (SELECT recipe_saved
             FROM saved_recipes
             WHERE saved_by = $1)
        GROUP BY r.recipe_id ORDER BY LOWER(r.title);`,
        [user_id]
      );
      response.status(200).json(rows);
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
