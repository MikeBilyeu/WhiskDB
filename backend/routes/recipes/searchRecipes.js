const db = require("../../db");
module.exports = async (req, res) => {
  let { search, offset, sort, user_id } = JSON.parse(
    JSON.stringify(req.query).toLowerCase()
  );

  let textSearch = search.trim().replace(/\s+/g, ":* | ") + ":*";

  const LIMIT = 12;
  const OFFSET = offset * LIMIT;

  let orderBy = `rank DESC,${
    sort === "time"
      ? "r.total_time ASC,"
      : sort === "newest"
      ? "r.created_at DESC,"
      : ""
  } num_reviews DESC,
  rating DESC,
  r.created_at DESC`;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT DISTINCT r.*,
        (SELECT ARRAY_AGG(CONCAT(amount, ' ', ingredient)) FROM "INGREDIENTS" i WHERE i.recipe_id = r.recipe_id)
        AS ingredients,
        (SELECT COUNT(1) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::INT
        AS num_reviews,
        (SELECT COALESCE(AVG(rating), 0) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::FLOAT
        AS rating,
        (SELECT COUNT(1) FROM "RECIPES_SAVES" rs WHERE rs.recipe_id = r.recipe_id)::INT
        AS num_saves,
        rs IS NOT NULL AS saved,
        ur IS NOT NULL AS author,
        ts_rank_cd('{0.1, 0.05, 0.1, 1.0}', rsrch.ts_vector, to_tsquery('english', $4), 1) AS RANK,
        COUNT(*) OVER()::INT AS full_count
      FROM "RECIPES" r
      LEFT JOIN "RECIPES_SAVES" rs ON rs.recipe_id = r.recipe_id AND rs.user_id = $1
      LEFT JOIN "USERS_RECIPES" ur ON ur.recipe_id = r.recipe_id AND ur.user_id = $1
      JOIN "RECIPES_SEARCHES" rsrch ON rsrch.recipe_id = r.recipe_id
      WHERE to_tsquery('english', $4) @@ rsrch.ts_vector
      GROUP BY (r.recipe_id, rs.*, ur.*, rsrch.ts_vector)
      ORDER BY ${orderBy}
      LIMIT $2
      OFFSET $3;`,
      [user_id, LIMIT, OFFSET, textSearch]
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
