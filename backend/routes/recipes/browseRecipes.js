const db = require("../../db");

module.exports = async (req, res) => {
  let { category, diet, sort, offset, user_id } = JSON.parse(
    JSON.stringify(req.query).toLowerCase()
  );
  !diet ? (diet = "none") : null;
  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  let orderBy = `${
    sort === "time"
      ? "r.total_time_mins ASC,"
      : sort === "newest"
      ? "r.created_at DESC,"
      : ""
  } num_reviews DESC,
  rating DESC,
  r.created_at DESC`;

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
             r.created_at,
             r.keywords,
             r.categories,
             u.username,
             AVG(rw.rating) AS rating,
             COUNT(DISTINCT rw)::INT AS num_reviews,
             s.user_id = $5 AS saved,
             COUNT(DISTINCT sr)::INT AS num_saves,
             COUNT(r.recipe_id) OVER()::INT AS full_count
      FROM recipes r
      right JOIN users u ON u.user_id = r.created_by
      LEFT JOIN reviews rw USING(recipe_id)
      LEFT JOIN saved_recipes sr USING(recipe_id)
      LEFT JOIN saved_recipes s ON r.recipe_id = s.recipe_id AND s.user_id = $5
      WHERE r.recipe_id
          IN (SELECT recipe
              FROM recipes_join_categories
              WHERE $1 = 'all categories' OR category = $1)
          AND r.recipe_id
          IN (SELECT recipe
              FROM recipes_join_categories
              WHERE $2 = 'none' OR category = $2)
      GROUP BY r.recipe_id, u.user_id, s.user_id
      ORDER BY ${orderBy}
      LIMIT $3
      OFFSET $4;`,
      [category, diet, LIMIT, OFFSETNUM, user_id]
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
