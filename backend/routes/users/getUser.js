const db = require("../../db");

module.exports = async (req, res) => {
  const { user_id } = req.user; // Get user_id from auth
  try {
    const { rows, rowCount } = await db.query(
      `SELECT user_id,
             username,
             full_name,
             email,
             diet,
             image_url
      FROM users
      WHERE user_id = $1`,
      [user_id]
    );
    if (rowCount === 0) {
      return res.status(401);
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};
