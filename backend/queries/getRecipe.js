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

  // promise - checkout a client
  pool.connect().then(client => {
    //Getting recipe data
    return client
      .query(
        `SELECT r.*, AVG(rw.rating) AS rating,
        CAST(count(rw.*) AS INTEGER) AS num_reviews,
        TO_CHAR(r.created_at, 'Mon fmDD, YYYY') AS date_created,
        u.username AS username, CASE WHEN EXISTS ( SELECT * FROM
           saved_recipes WHERE saved_by = $2 AND recipe_saved = $1) THEN
           1::INTEGER ELSE 0::INTEGER END AS saved FROM recipes r
            LEFT JOIN users u ON u.user_id = r.created_by
            LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
               WHERE r.recipe_id = $1
               GROUP BY r.recipe_id, u.user_id, rw.recipe_id`,
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
