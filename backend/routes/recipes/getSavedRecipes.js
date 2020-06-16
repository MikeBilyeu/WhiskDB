const db = require("../../db");

module.exports = async (req, res) => {
  const { user_id } = req.user;
  const { category, offset } = req.query;
  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.*
      FROM "RECIPES" r
      JOIN "RECIPES_SAVES" rs ON rs.user_id = $1;`,
      [user_id]
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
