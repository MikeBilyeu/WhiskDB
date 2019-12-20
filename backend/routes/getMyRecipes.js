const Router = require("express-promise-router");
const passport = require("passport");
const db = require("../db");
const router = new Router();
module.exports = router;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user; // Get user_id from auth

    try {
      const { rows } = await db.query(
        `SELECT r.recipe_id,
                r.title,
                r.image_url,
                r.created_at,
                r.total_time_mins,
                COALESCE(AVG(rw.rating), 0) AS rating,
                CAST(count(distinct rw.*) AS INTEGER) AS num_reviews,
                COUNT(distinct sr.*) AS num_saves
        FROM recipes r
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
        WHERE created_by = $1
        GROUP BY r.recipe_id,
                 sr.recipe_saved
        ORDER BY created_at DESC;`,
        [user_id]
      );
      response.status(200).json(rows);
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
