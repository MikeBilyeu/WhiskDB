const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id, user_id } = req.query;
  try {
    if (isNaN(recipe_id)) {
      return res.status(404).send("Recipe not found");
    }
    const { rows } = await db.query(
      `SELECT r.*,
             TO_CHAR(r.created_at, 'Mon fmDD, YYYY') AS date_created,
             u.username AS username,
             sr.saved_by = $2 saved,
             COALESCE(AVG(rw.rating), 0) AS rating,
             CAST(count(rw.*) AS INTEGER) AS num_reviews
      FROM recipes r
      LEFT JOIN users u ON u.user_id = r.created_by
      LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
      AND sr.saved_by = $2
      LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
      WHERE r.recipe_id = $1
      GROUP BY r.recipe_id,
               u.user_id,
               sr.saved_by;`,
      [recipe_id, user_id]
    );
    if (rows[0]) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
