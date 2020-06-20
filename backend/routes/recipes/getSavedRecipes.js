const db = require("../../db");

module.exports = async (req, res) => {
  const { user_id } = req.user;
  const { category, offset } = req.query;
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
      JOIN "USERS_RECIPES" ur  USING(recipe_id)
      FULL JOIN "RECIPES_SAVES" rs USING(recipe_id)
      WHERE ur.user_id = $1 OR rs.user_id = $1
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
    console.error(err);
    res.status(500).json(err);
  }
};
