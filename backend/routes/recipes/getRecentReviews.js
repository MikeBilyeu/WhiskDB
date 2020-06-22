const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id } = req.query;
  try {
    const { rows } = await db.query(
      `SELECT rw.rating,
              rw.comment,
              u.username
       FROM "RECIPES_REVIEWS" rw
       LEFT JOIN "USERS" u USING (user_id)
       WHERE rw.recipe_id = $1 AND rw.comment != ''
       ORDER BY rw.created_at DESC
       LIMIT 3;`,
      [recipe_id]
    );

    if (!rows.length) {
      res.status(204).send();
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
