const db = require("../../db");

module.exports = async (req, res) => {
  const { recipeId } = req.query;
  const { user_id } = req.user;

  try {
    await db.query(
      `DELETE FROM recipes r WHERE r.recipe_id = $1 AND r.created_by = $2`,
      [recipeId, user_id]
    );

    res.status(200).send("Recipe deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};