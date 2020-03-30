const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id } = req.query;
  const { user_id } = req.user; // Get user_id from auth
  try {
    const { rows, rowCount } = await db.query(
      `SELECT rw.rating,
               rw.comment
        FROM reviews rw
        WHERE rw.recipe_id = $1
          AND rw.user_id = $2
        LIMIT 1`,
      [recipe_id, user_id]
    );

    if (rowCount < 1) {
      res.status(204).send();
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
