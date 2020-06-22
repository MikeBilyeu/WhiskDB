const db = require("../../db");
module.exports = async (req, res) => {
  const { recipe_id, rating, comment } = req.body;
  const { user_id } = req.user; // Get user_id from auth
  console.log(req.body);
  try {
    await db.query(
      `INSERT INTO "RECIPES_REVIEWS"
        VALUES (DEFAULT, $1, $2, $3, $4, NOW(), DEFAULT);`,
      [user_id, recipe_id, rating, comment]
    );
    res.status(200).send("Review sent");
  } catch (err) {
    res.status(500).json(err);
  }
};
