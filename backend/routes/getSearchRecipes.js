const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
module.exports = router;

router.get("/", async (request, response) => {
  let { search, offset } = JSON.parse(
    request.query.filterRecipes.toLowerCase()
  );
  const { user_id } = request.query;
  search = search.trim();
  const LIMIT = 10;
  const OFFSET = offset * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.recipe_id,
             r.title,
             r.total_time_mins,
             r.image_url,
             r.created_at,
             COALESCE(AVG(rw.rating), 0) AS rating,
             CAST(count(distinct rw.*) AS INTEGER) AS num_reviews,
             COUNT(distinct sr.*) AS num_saves,
             COUNT(*) OVER() AS full_count
      FROM recipes r
      LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
      LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
      WHERE document_vectors @@ to_tsquery($1)
      GROUP BY r.recipe_id,
               sr.recipe_saved
      ORDER BY rating DESC,
               num_reviews DESC
               LIMIT $2 OFFSET $3;`,
      [search, LIMIT, OFFSET]
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
});
