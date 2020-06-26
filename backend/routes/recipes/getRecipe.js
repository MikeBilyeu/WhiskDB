const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id, user_id } = req.query;
  try {
    if (isNaN(recipe_id)) {
      return res.status(404).send("Recipe not found");
    }
    const { rows } = await db.query(
      `SELECT r.*,
        (SELECT ARRAY_AGG(CONCAT(amount, ' ', ingredient) ORDER BY i.order ASC) FROM "INGREDIENTS" i WHERE i.recipe_id = r.recipe_id)
        AS ingredients,
        (SELECT COUNT(1) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::INT
        AS num_reviews,
        (SELECT COALESCE(AVG(rating), 0) FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = r.recipe_id)::FLOAT
        AS rating,
        (SELECT STRING_AGG(rk.keyword, ', ' ORDER BY rk.order ASC) FROM "RECIPES_KEYWORDS" rk WHERE rk.recipe_id = r.recipe_id)
        AS keywords,
        (SELECT ARRAY_AGG(rc.category) FROM "RECIPES_CATEGORIES" rc WHERE rc.recipe_id = r.recipe_id)
        AS categories,
        rs IS NOT NULL AS saved,
        ur IS NOT NULL AS author
      FROM "RECIPES" r
      LEFT JOIN "USERS_RECIPES" ur ON ur.recipe_id = r.recipe_id AND ur.user_id = $2
      LEFT JOIN "RECIPES_SAVES" rs ON rs.recipe_id = r.recipe_id AND rs.user_id = $2
      WHERE r.recipe_id = $1;`,
      [recipe_id, user_id]
    );

    if (rows[0]) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
