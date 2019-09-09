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
        CASE WHEN count(lr.*) + count(dr.*) = 0 THEN 0
          ELSE (count(lr.*) / CAST (count(lr.*) + count(dr.*) AS FLOAT)) * 5
          END
        AS rating, CAST(count(lr.*) + count(dr.*) AS INTEGER) AS votes
        FROM recipes r
        LEFT JOIN liked_recipes lr ON r.recipe_id = lr.recipe_liked
        LEFT JOIN disliked_recipes dr ON r.recipe_id = dr.recipe_disliked
        WHERE created_by = $1 GROUP BY r.recipe_id;`,
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
