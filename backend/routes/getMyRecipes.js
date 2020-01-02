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
    const { meal } = request.query;

    try {
      const { rows } = await db.query(
        `SELECT r.recipe_id,
               r.title,
               r.image_url,
               r.created_at,
               r.total_time_mins,
               COALESCE(AVG(rw.rating), 0) AS rating,
               CAST(count(DISTINCT rw.*) AS INTEGER) AS num_reviews,
               COUNT(DISTINCT sr.*) AS num_saves
        FROM recipes r
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
        LEFT JOIN recipes_join_categories rjc ON rjc.recipe = r.recipe_id
        WHERE CASE
                  WHEN $2 = 'All Meals' THEN created_by = $1
                  ELSE created_by = $1
                       AND rjc.category =
                         (SELECT category_id
                          FROM categories
                          WHERE category_name = LOWER($2))
              END
        GROUP BY r.recipe_id,
                 sr.recipe_saved
        ORDER BY created_at DESC;`,
        [user_id, meal]
      );
      response.status(200).json(rows);
    } catch (err) {
      console.error(err);
      response.status(500).json(err);
    }
  }
);
