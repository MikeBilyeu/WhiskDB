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
        `SELECT r.*, u.username AS username, CASE WHEN count(lr.*) +
         count(dr.*) = 0 THEN 0 ELSE (count(lr.*) / CAST (count(lr.*) +
         count(dr.*) AS FLOAT)) * 5 END AS rating, CAST(count(lr.*) +
         count(dr.*) AS INTEGER) AS votes, CASE WHEN EXISTS ( SELECT * FROM
           saved_recipes WHERE saved_by = $2 AND recipe_saved = $1) THEN
           CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS saved, CASE WHEN EXISTS
           ( SELECT * FROM liked_recipes WHERE liked_by = $2 AND recipe_liked
             = $1) THEN 'liked' WHEN EXISTS ( SELECT * FROM disliked_recipes
               WHERE disliked_by = $2 AND recipe_disliked = $1) THEN
               'disliked' ELSE null END AS vote FROM recipes r LEFT JOIN
               users u ON u.user_id = r.created_by LEFT JOIN liked_recipes
               lr ON r.recipe_id = lr.recipe_liked LEFT JOIN disliked_recipes
               dr ON r.recipe_id = dr.recipe_disliked WHERE recipe_id = $1
               GROUP BY r.recipe_id, u.user_id`,
        [recipe_id, user_id]
      )
      .then(res => {
        client.release();
        response.status(200).json(res.rows[0]);
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      });
  });
};

module.exports = {
  getRecipe
};
