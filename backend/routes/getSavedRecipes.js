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
    const { meal } = request.query;

    try {
      const { rows } = await db.query(
        `SELECT r.recipe_id,
               r.title,
               r.image_url,
               r.total_time_mins,
               COALESCE(AVG(rw.rating), 0) AS rating,
               CAST(COUNT(DISTINCT rw.*) AS INTEGER) AS num_reviews,
               COUNT(sr.*) AS num_saves
        FROM saved_recipes sr
        LEFT JOIN recipes r ON r.recipe_id = sr.recipe_saved
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        LEFT JOIN recipes_join_categories rjc ON rjc.recipe = sr.recipe_saved
        WHERE CASE
                  WHEN $2 = 'All Meals' THEN sr.saved_by = $1
                  ELSE sr.saved_by = $1
                       AND rjc.category =
                         (SELECT category_id
                          FROM categories
                          WHERE category_name = LOWER($2))
              END
        GROUP BY sr.saved_at, r.recipe_id
        ORDER BY sr.saved_at DESC;`,
        [user_id, meal]
      );
      response.status(200).json(rows);
    } catch (err) {
      console.error(err);
      response.status(500).json(err);
    }
  }
);
