const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

router.get("/", async (request, response) => {
  let { meal, diet, sort } = JSON.parse(request.query.browseData.toLowerCase());
  const { user_id } = request.query;
  diet = diet === "none" ? null : diet;
  const numOfCats = diet ? (meal == "all meals" ? 1 : 2) : 1;
  const LIMIT = 10;
  const OFFSET = 0 * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.recipe_id,
       r.title,
       r.total_time_mins,
       r.image_url,
       r.created_at,
       COALESCE(AVG(rw.rating), 0) AS rating,
       CAST(COUNT(distinct rw.*) AS INTEGER) AS num_reviews,
       COUNT(distinct sr.*) AS num_saves
      FROM recipes r
      LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
      LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
      WHERE r.recipe_id IN
      (SELECT recipe
      FROM recipes_join_categories
      WHERE CASE
               WHEN $2 != ''
                    AND $1 != 'all meals' THEN category IN
                      (SELECT category_id
                       FROM categories
                       WHERE category_name IN ($2,
                                               $1) )
               WHEN $2 != ''
                    AND $1 = 'all meals' THEN category IN
                      (SELECT category_id
                       FROM categories
                       WHERE category_name IN ($2))
               WHEN $1 != 'all meals' THEN category IN
                      (SELECT category_id
                       FROM categories
                       WHERE category_name IN ($1))
               ELSE category IN
                      (SELECT category_id
                       FROM categories)
           END
      GROUP BY recipe
      HAVING COUNT(*) >= $3)
      GROUP BY r.recipe_id,
         rw.recipe_id,
         sr.recipe_saved
      ORDER BY CASE
             WHEN $4 = 'a-z' THEN LOWER(r.title)
         END ASC, CASE
                      WHEN $4 = 'time' THEN r.total_time_mins
                  END ASC, CASE
                               WHEN $4 = 'newest' THEN r.created_at
                           END DESC, rating DESC,
                                     num_reviews DESC,
                                     created_at DESC
                                     LIMIT $5 OFFSET $6;`,
      [meal, diet, numOfCats, sort, LIMIT, OFFSET]
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
