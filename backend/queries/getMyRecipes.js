const Pool = require("pg").Pool;

const keys = require("../config/keys");

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getMyRecipes = (request, response) => {
  const { user_id } = request.query;
  //connect pool
  pool.connect().then(client => {
    return client
      .query(
        `SELECT r.recipe_id, r.title, r.image_url,
        r.created_at, r.total_time_mins, COALESCE(AVG(rw.rating), 0) AS rating,
        CAST(count(rw.*) AS INTEGER) AS num_reviews
        FROM recipes r
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        WHERE created_by = $1 GROUP BY r.recipe_id, rw.recipe_id ORDER BY created_at DESC;`,
        [user_id]
      )
      .then(res => {
        client.release();
        response.status(200).json(res.rows);
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      });
  });
};

module.exports = {
  getMyRecipes
};
