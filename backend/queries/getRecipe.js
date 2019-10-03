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

const getRecipe = (request, response) => {
  const { recipe_id, user_id } = request.query;

  pool.connect().then(client => {
    return client
      .query(
        `SELECT r.*,
         TO_CHAR(r.created_at, 'Mon fmDD, YYYY') AS date_created,
         u.username AS username, sr.saved_by = $2 saved,
         COALESCE(AVG(rw.rating), 0) AS rating,
         CAST(count(rw.*) AS INTEGER) AS num_reviews
         FROM recipes r
          LEFT JOIN users u ON u.user_id = r.created_by
          LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved AND sr.saved_by = $2
          LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
          WHERE r.recipe_id = $1
          GROUP BY r.recipe_id, u.user_id, sr.saved_by;`,
        [recipe_id, user_id]
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
  getRecipe
};
