const db = require("../../db");

module.exports = async (req, res) => {
  const { recipe_id } = req.query;
  try {
    const { rows } = await db.query(
      `SELECT COALESCE(CAST(SUM(CASE
                                 WHEN rating = 5 THEN 1
                                 ELSE 0
                             END) AS INTEGER), 0) AS star5,
           COALESCE(CAST(SUM(CASE
                                 WHEN rating = 4 THEN 1
                                 ELSE 0
                             END) AS INTEGER), 0) AS star4,
           COALESCE(CAST(SUM(CASE
                                 WHEN rating = 3 THEN 1
                                 ELSE 0
                             END) AS INTEGER), 0) AS star3,
           COALESCE(CAST(SUM(CASE
                                 WHEN rating = 2 THEN 1
                                 ELSE 0
                             END) AS INTEGER), 0) AS star2,
           COALESCE(CAST(SUM(CASE
                                 WHEN rating = 1 THEN 1
                                 ELSE 0
                             END) AS INTEGER), 0) AS star1,
           CAST(count(rw.*) AS INTEGER) AS num_reviews,
           COALESCE(AVG(rw.rating), 0) AS rating
    FROM reviews rw
    WHERE recipe_id = $1`,
      [recipe_id]
    );
    if (rows[0]) {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};