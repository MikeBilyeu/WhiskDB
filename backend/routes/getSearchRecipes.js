const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
module.exports = router;

router.get("/", async (request, response) => {
  let { search } = JSON.parse(request.query.browseData.toLowerCase());
  const { user_id } = request.query;
  search = search.trim();
  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.recipe_id,
             u.username AS username,
             r.title,
             r.total_time_mins,
             r.image_url,
             r.created_at,
             COALESCE(AVG(rw.rating), 0) AS rating,
             CAST(count(rw.*) AS INTEGER) AS num_reviews,
             sr.saved_by = $2 AS saved
      FROM recipes r
      LEFT JOIN users u ON r.created_by = u.user_id
      LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
      LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
      AND sr.saved_by = $2
      WHERE document_vectors @@ to_tsquery($1)
      GROUP BY r.recipe_id,
               u.user_id,
               sr.saved_by
      ORDER BY rating DESC,
               num_reviews DESC;`,
      [search, user_id]
    );
    if (rowCount < 1) {
      response.status(204).send();
    } else {
      response.status(200).json(rows);
    }
  } catch (err) {
    response.status(500).json(err);
  }
});