const db = require("../../db");

module.exports = async (req, res) => {
  let { category, diet, sort, offset, user_id } = req.query;

  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  let orderBy = `${
    sort === "Time"
      ? "r.total_time ASC,"
      : sort === "Newest"
      ? "r.created_at DESC,"
      : ""
  } num_reviews DESC,
  rating DESC,
  r.created_at DESC`;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT DISTINCT r.*,
        (SELECT ARRAY_AGG(CONCAT(amount, ' ', ingredient) ORDER BY i.order ASC) FROM "INGREDIENTS" i WHERE i.recipe_id = r.recipe_id)
        AS ingredients,
        (SELECT COUNT(1) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::INT
        AS num_reviews,
        (SELECT COALESCE(AVG(rating), 0) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::FLOAT
        AS rating,
        (SELECT COUNT(1) FROM "RECIPES_SAVES" rs WHERE rs.recipe_id = r.recipe_id)::INT
        AS num_saves,
        (SELECT STRING_AGG(rk.keyword, ', ' ORDER BY rk.order ASC) FROM "RECIPES_KEYWORDS" rk WHERE rk.recipe_id = r.recipe_id)
        AS keywords,
        (SELECT ARRAY_AGG(rc.category) FROM "RECIPES_CATEGORIES" rc WHERE rc.recipe_id = r.recipe_id)
        AS categories,
        rs IS NOT NULL AS saved,
        ur IS NOT NULL AS author,
        COUNT(*) OVER()::INT AS full_count
      FROM "RECIPES" r
      JOIN "RECIPES_CATEGORIES" rc ON rc.recipe_id = r.recipe_id AND
        ($4 = 'All Categories' OR rc.category = $4)
      LEFT JOIN "RECIPES_SAVES" rs ON rs.recipe_id = r.recipe_id AND rs.user_id = $1
      LEFT JOIN "USERS_RECIPES" ur ON ur.recipe_id = r.recipe_id AND ur.user_id = $1
      GROUP BY (r.recipe_id, rs.*, ur.*)
      ORDER BY ${orderBy}
      LIMIT $2
      OFFSET $3;`,
      [user_id, LIMIT, OFFSETNUM, category]
    );
    if (rowCount < 1) {
      res.status(204).send();
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
