const db = require("../../db");

module.exports = async (req, res) => {
  const { user_id } = req.user; // Get user_id from auth
  try {
    await db.query(
      `DELETE
      FROM users
      WHERE user_id = $1`,
      [user_id]
    );
    res.status(200).send("Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
