const db = require("../../db");

module.exports = async (req, res) => {
  let { category, diet, sort, offset, user_id } = JSON.parse(
    JSON.stringify(req.query).toLowerCase()
  );
  console.log("data input", req.query);

  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.*,
        (SELECT ARRAY_AGG(CONCAT(amount, ' ', ingredient)) FROM "INGREDIENTS" i WHERE i.recipe_id = r.recipe_id)
        AS ingredients,
        (SELECT COUNT(1) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::INT
        AS num_reviews,
        (SELECT COALESCE(AVG(rating), 0) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::FLOAT
        AS rating,
        rs IS NOT NULL AS saved
      FROM "RECIPES" r
      LEFT JOIN "RECIPES_SAVES" rs ON rs.recipe_id = r.recipe_id AND rs.user_id = $1
      LIMIT $2
      OFFSET $3;`,
      [user_id, LIMIT, OFFSETNUM]
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
