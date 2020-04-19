const db = require("../../db");

module.exports = async (req, res) => {
  let { category, diet, sort, offset, user_id } = JSON.parse(
    req.query.filterRecipes.toLowerCase()
  );
  !diet ? (diet = "none") : null;
  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  let query = ``;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.recipe_id,
             r.image_url,
             r.title,
             r.total_time_mins,
             r.servings,
             r.footnote,
             r.directions,
             r.ingredients,
             u.username,
             sr.user_id = $6 AS saved,
             AVG(rw.rating) AS rating,
             COUNT(DISTINCT rw)::INT AS num_reviews,
             COUNT(DISTINCT sr)::INT AS num_saves,
             COUNT(1) OVER()::INT AS full_count
      FROM recipes r
      JOIN users u ON u.user_id = r.created_by
      LEFT JOIN reviews rw USING (recipe_id)
      LEFT JOIN saved_recipes sr USING (recipe_id)
      JOIN recipes_join_categories rjc ON rjc.category = 'dinner'
      WHERE r.recipe_id
          IN (SELECT recipe
              FROM recipes_join_categories
              WHERE $1 = 'all categories' OR category = $2)
          AND r.recipe_id
          IN (SELECT recipe
              FROM recipes_join_categories
              WHERE $2 = 'none' OR category = $2)
      GROUP BY r.recipe_id, u.user_id, sr.user_id
      ORDER BY CASE WHEN $3 = 'time' THEN r.total_time_mins END ASC,
               CASE WHEN $3 = 'newest' THEN r.created_at END DESC,
               num_reviews DESC,
               rating DESC,
               num_reviews DESC,
               r.created_at DESC
      LIMIT $4
      OFFSET $5;`,
      [category, diet, sort, LIMIT, OFFSETNUM, user_id]
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
