const db = require("../../db");

module.exports = async (req, res) => {
  let { category, diet, sort, offset } = JSON.parse(
    req.query.filterRecipes.toLowerCase()
  );
  const { user_id } = req.query;
  diet = diet === "none" ? null : diet;
  const numOfCats = diet ? (category === "all categories" ? 1 : 2) : 1;
  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.recipe_id,
             r.title,
             r.total_time_mins,
             r.image_url,
             r.created_at,
             COALESCE(AVG(rw.rating), 0) AS rating,
             CAST(COUNT(DISTINCT rw.*) AS INTEGER) AS num_reviews,
             COUNT(DISTINCT sr.*) AS num_saves,
             COUNT(*) OVER() AS full_count
      FROM recipes r
      LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
      LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
      WHERE r.recipe_id IN
          (SELECT recipe
           FROM recipes_join_categories
           WHERE CASE
                     WHEN $2 != ''
                          AND $1 != 'all categories' THEN category IN ($1,
                                                                  $2)
                     WHEN $2 != ''
                          AND $1 = 'all categories' THEN category IN ($2)
                     WHEN $1 != 'all categories' THEN category IN ($1)
                     ELSE TRUE
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
      LIMIT $5
      OFFSET $6;`,
      [category, diet, numOfCats, sort, LIMIT, OFFSETNUM]
    );
    if (rowCount < 1) {
      res.status(204).send();
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
