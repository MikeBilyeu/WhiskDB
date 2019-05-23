const Pool = require("pg").Pool;

const keys = require("../config/keys");

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getSavedRecipes = (request, response) => {
  const { user_id } = request.query;
  //connect pool
  pool.connect().then(client => {
    return client
      .query(
        `SELECT r.recipe_id, r.title, r.total_time_mins, r.image_url,
        count(lr.*) AS likes, count(dr.*) AS dislikes FROM recipes r LEFT JOIN
        liked_recipes lr ON r.recipe_id = lr.recipe_liked LEFT JOIN
        disliked_recipes dr ON r.recipe_id = dr.recipe_disliked WHERE
        r.recipe_id IN ( SELECT recipe_saved FROM saved_recipes WHERE
        saved_by = $1 ) GROUP BY r.recipe_id`,
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
  getSavedRecipes
};
