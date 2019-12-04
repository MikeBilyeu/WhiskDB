const pool = require("../utils/connectPool");

const getRatingDetails = async (request, response) => {
  const { recipe_id } = request.query;
  try {
    const client = await pool.connect();
    const res = await client.query(
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
    if (res.rows[0]) {
      response.status(200).json(res.rows[0]);
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  getRatingDetails
};
