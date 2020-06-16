const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id } = req.query;
  const { user_id } = req.user;
  try {
    const { rows } = await db.query(
      `SELECT rw.rating,
              rw.comment,
              u.name
       FROM "RECIPES_REVIEWS" rw
       LEFT JOIN "USERS" u USING (user_id)
       WHERE rw.user_id = $2
          AND rw.recipe_id = $1;`,
      [recipe_id, user_id]
    );
    console.log(rows);
    if (!rows.length) {
      res.status(204).send();
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
