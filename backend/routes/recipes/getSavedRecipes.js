const db = require("../../db");

module.exports = async (req, res) => {
  const { user_id } = req.user;
  const { category, offset } = req.query;
  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT DISTINCT(r.recipe_id),
             r.created_by,
             r.image_url,
             r.title,
             r.total_time_mins,
             r.servings,
             r.footnote,
             r.directions,
             r.ingredients,
             r.keywords,
             r.categories,
             u.username,
             sr.user_id = $1 AS saved,
             AVG(rw.rating) AS rating,
             COUNT(DISTINCT rw)::INT AS num_reviews,
             COUNT(DISTINCT sr)::INT AS num_saves,
             COUNT(r.recipe_id) OVER()::INT AS full_count,
             COALESCE(sr.saved_at, r.created_at) AS saved_at
      FROM recipes r
      JOIN users u ON u.user_id = r.created_by
      LEFT JOIN reviews rw USING (recipe_id)
      LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_id AND sr.user_id = $1
      LEFT JOIN recipes_join_categories rjc ON rjc.recipe = r.recipe_id
      WHERE ($2 = 'All Categories'
              OR rjc.category = LOWER($2))
            AND (sr.user_id = $1 OR r.created_by = $1)
      GROUP BY r.recipe_id,
               u.username,
               sr.user_id,
               sr.saved_at
      ORDER BY saved_at DESC
      LIMIT $3
      OFFSET $4;`,
      [user_id, category, LIMIT, OFFSETNUM]
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
