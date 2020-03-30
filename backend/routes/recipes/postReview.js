const db = require("../../db");
module.exports = async (req, res) => {
  const { recipe_id, rating, comment } = req.body;
  const { user_id } = req.user; // Get user_id from auth
  try {
    await db.query(
      `INSERT INTO reviews (recipe_id, rating, COMMENT, user_id)
        VALUES ($1, $2, $3, $4)`,
      [recipe_id, rating, comment, user_id]
    );
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
};
