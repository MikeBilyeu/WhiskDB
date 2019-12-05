const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

router.get("/recipe", async (request, response) => {
  const { recipe_id, user_id } = request.query;
  try {
    const { rows } = await db.query(
      `SELECT r.*,
             TO_CHAR(r.created_at, 'Mon fmDD, YYYY') AS date_created,
             u.username AS username,
             sr.saved_by = $2 saved,
             COALESCE(AVG(rw.rating), 0) AS rating,
             CAST(count(rw.*) AS INTEGER) AS num_reviews
      FROM recipes r
      LEFT JOIN users u ON u.user_id = r.created_by
      LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
      AND sr.saved_by = $2
      LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
      WHERE r.recipe_id = $1
      GROUP BY r.recipe_id,
               u.user_id,
               sr.saved_by;`,
      [recipe_id, user_id]
    );
    if (rows[0]) {
      response.status(200).json(rows[0]);
    }
  } catch (err) {
    response.status(500).json(err);
  }
});
