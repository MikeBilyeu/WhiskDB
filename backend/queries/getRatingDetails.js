const Pool = require("pg").Pool;

const keys = require("../config/keys");

// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getRatingDetails = (request, response) => {
  const { recipe_id } = request.query;

  // promise - checkout a client
  pool.connect().then(client => {
    //Getting recipe data
    return client
      .query(
        `SELECT
        COALESCE(CAST(SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS INTEGER), 0) AS star5,
        COALESCE(CAST(SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS INTEGER), 0) AS star4,
        COALESCE(CAST(SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS INTEGER), 0) AS star3,
        COALESCE(CAST(SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS INTEGER), 0) AS star2,
        COALESCE(CAST(SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS INTEGER), 0) AS star1,
        CAST(count(rw.*) AS INTEGER) AS num_reviews,
        COALESCE(AVG(rw.rating), 0) AS rating
        FROM reviews rw WHERE recipe_id = $1`,
        [recipe_id]
      )
      .then(res => {
        client.release();
        if (res.rows[0]) {
          response.status(200).json(res.rows[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = {
  getRatingDetails
};
