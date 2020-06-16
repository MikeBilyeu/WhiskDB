const db = require("../../db");
module.exports = async (req, res) => {
  const { recipe_id } = req.body;
  const { user_id } = req.user; // Get user_id from auth
  try {
    // Add saved recipe to db
    await db.query(
      `INSERT INTO "RECIPE_SAVES" (user_id, recipe_id)
              VALUES ($1, $2)`,
      [user_id, recipe_id]
    );
    res.status(200).send("saved");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
