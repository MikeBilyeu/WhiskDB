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
    const { meal, offset } = request.query;
    console.log(offset);
    const LIMIT = 12;
    const OFFSETNUM = offset * LIMIT;

    try {
      const { rows, rowCount } = await db.query(
        `SELECT r.recipe_id,
               r.title,
               r.image_url,
               r.total_time_mins,
               COALESCE(AVG(rw.rating), 0) AS rating,
               CAST(count(DISTINCT rw.*) AS INTEGER) AS num_reviews,
               COUNT(DISTINCT sr.*) AS num_saves,
               COUNT(*) OVER() AS full_count,
               COALESCE(
                          (SELECT sr.saved_at
                           FROM saved_recipes sr
                           WHERE sr.recipe_saved = r.recipe_id
                             AND sr.saved_by = $1), r.created_at) AS saved_at
        FROM recipes r
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
        LEFT JOIN recipes_join_categories rjc ON rjc.recipe = r.recipe_id
        WHERE (r.recipe_id IN
                 (SELECT sr.recipe_saved
                  FROM saved_recipes sr
                  WHERE sr.saved_by = $1)
               OR r.created_by = $1)
          AND CASE
                  WHEN $2 = 'All Meals' THEN TRUE
                  ELSE rjc.category = LOWER($2)
              END
        GROUP BY r.recipe_id
        ORDER BY saved_at DESC
        LIMIT $3
        OFFSET $4;`,
        [user_id, meal, LIMIT, OFFSETNUM]
      );
      if (rowCount < 1) {
        response.status(204).send();
      } else {
        response.status(200).json(rows);
      }
    } catch (err) {
      console.error(err);
      response.status(500).json(err);
    }
  }
);
