const db = require("../../db");

module.exports = async (req, res) => {
  let { category, diet, sort, offset } = JSON.parse(
    req.query.filterRecipes.toLowerCase()
  );
  !diet ? (diet = "none") : null;
  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  let query = ``;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.recipe_id,
             r.title,
             r.image_url,
             COALESCE(AVG(rw.rating), 0) AS rating,
             CAST(COUNT(DISTINCT rw.*) AS INTEGER) AS num_reviews,
             COUNT(DISTINCT sr.*) AS num_saves,
             COUNT(*) OVER() AS full_count
      FROM recipes r
      LEFT JOIN reviews rw USING (recipe_id)
      LEFT JOIN saved_recipes sr USING (recipe_id)
      WHERE r.recipe_id
      IN
        (SELECT recipe
         FROM recipes_join_categories
         WHERE CASE WHEN $1 = 'all categories' THEN true
                    ELSE category = $1 END)
      AND r.recipe_id
      IN
        (SELECT recipe
        FROM recipes_join_categories
        WHERE CASE WHEN $2 = 'none' THEN true
                   ELSE category = $2 END)
      GROUP BY r.recipe_id
      ORDER BY
        CASE WHEN $3 = 'time' THEN r.total_time_mins END ASC,
        CASE WHEN $3 = 'newest' THEN r.created_at END DESC,
        num_reviews DESC,
        rating DESC,
        num_reviews DESC,
        created_at DESC
      LIMIT $4
      OFFSET $5;`,
      [category, diet, sort, LIMIT, OFFSETNUM]
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
