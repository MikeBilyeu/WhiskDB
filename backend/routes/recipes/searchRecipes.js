const db = require("../../db");
module.exports = async (req, res) => {
  let { search, offset, sort, diet } = JSON.parse(
    req.query.filterRecipes.toLowerCase()
  );
  !diet ? (diet = "none") : null;
  search = search.trim().replace(/\s+/g, " & ");
  search = search.trim();

  const LIMIT = 12;
  const OFFSET = offset * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.recipe_id,
             r.title,
             r.total_time_mins,
             r.image_url,
             r.created_at,
             COALESCE(AVG(rw.rating), 0) AS rating,
             CAST(count(DISTINCT rw.*) AS INTEGER) AS num_reviews,
             COUNT(DISTINCT sr.*) AS num_saves,
             COUNT(*) OVER() AS full_count,
             ts_rank_cd('{0.1, 0.05, 0.1, 1.0}',
                        document_vectors, to_tsquery($1), 1) AS rank
      FROM recipes r
      LEFT JOIN reviews rw USING (recipe_id)
      LEFT JOIN saved_recipes sr USING (recipe_id)
      WHERE to_tsquery($1) @@ document_vectors
      AND r.recipe_id IN
            (SELECT recipe
             FROM recipes_join_categories
             WHERE CASE WHEN $5 = 'none' THEN true
                        ELSE category = $5 END)
      GROUP BY r.recipe_id
      ORDER BY rank DESC,
               CASE WHEN $4 = 'time' THEN r.total_time_mins END ASC,
               CASE WHEN $4 = 'newest' THEN r.created_at END DESC,
               num_reviews DESC,
               rating DESC,
               num_reviews DESC,
               created_at DESC
      LIMIT $2
      OFFSET $3;`,
      [search, LIMIT, OFFSET, sort, diet]
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
