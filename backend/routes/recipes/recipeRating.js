const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id } = req.query;
  try {
    const { rows } = await db.query(
      `SELECT
          SUM((rating=5)::INT) AS star5,
          SUM((rating=4)::INT) AS star4,
          SUM((rating=3)::INT) AS star3,
          SUM((rating=2)::INT) AS star2,
          SUM((rating=1)::INT) AS star1,
          count(1)::INT AS num_reviews,
          AVG(rating) AS rating
      FROM RECIPES_REVIEWS
      WHERE recipe_id = $1;`,
      [recipe_id]
    );
    if (rows[0]) {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
