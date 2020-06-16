const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id, user_id } = req.query;
  try {
    if (isNaN(recipe_id)) {
      return res.status(404).send("Recipe not found");
    }
    const { rows } = await db.query(
      `SELECT r.*, rs IS NOT NULL AS saved
      FROM "RECIPES" r
      LEFT JOIN "RECIPES_SAVES" rs ON rs.recipe_id = r.recipe_id AND rs.user_id = $2
      WHERE r.recipe_id = $1;`,
      [recipe_id, user_id]
    );

    const { rows: ingredients } = await db.query(
      `SELECT amount, ingredient
      FROM "INGREDIENTS"
      WHERE recipe_id = $1;`,
      [recipe_id]
    );

    const recipe = { ...rows[0], ingredients: ingredients };

    if (rows[0]) {
      res.status(200).json(recipe);
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
