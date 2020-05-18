const db = require("../../db");
module.exports = async (req, res) => {
  let { search, offset, sort, diet, user_id } = JSON.parse(
    JSON.stringify(req.query).toLowerCase()
  );
  !diet ? (diet = "none") : null;
  search = search.trim().replace(/\s+/g, " & ");
  search = search.trim();

  const LIMIT = 12;
  const OFFSET = offset * LIMIT;

  let orderBy = `rank DESC,${
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
             COUNT(r.recipe_id) OVER()::INT AS full_count,
             ts_rank_cd('{0.1, 0.05, 0.1, 1.0}',
                        document_vectors, to_tsquery($1), 1) AS rank
      FROM recipes r
      right JOIN users u ON u.user_id = r.created_by
      LEFT JOIN reviews rw USING(recipe_id)
      LEFT JOIN saved_recipes sr USING(recipe_id)
      LEFT JOIN saved_recipes s ON r.recipe_id = s.recipe_id AND s.user_id = $5
      WHERE to_tsquery($1) @@ document_vectors
      AND r.recipe_id IN
            (SELECT recipe
             FROM recipes_join_categories
             WHERE CASE WHEN $4 = 'none' THEN true
                        ELSE category = $4 END)
      GROUP BY r.recipe_id, u.user_id, s.user_id
      ORDER BY ${orderBy}
      LIMIT $2
      OFFSET $3;`,
      [search, LIMIT, OFFSET, diet, user_id]
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
