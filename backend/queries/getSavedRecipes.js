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
  console.log(request.query);
  //connect pool
  pool.connect().then(client => {
    return client
      .query(
        `SELECT r.recipe_id, r.title, r.image_url,
        CASE WHEN count(lr.*) + count(dr.*) = 0 THEN 0
        ELSE (count(lr.*) / CAST (count(lr.*) + count(dr.*) AS FLOAT)) * 5
        END
        AS rating, CAST(count(lr.*) + count(dr.*) AS INTEGER) AS votes,
        sr.saved_at AS saved_date, u.username AS username,
        CASE WHEN EXISTS ( SELECT * FROM saved_recipes WHERE saved_by = $1 AND
          recipe_saved = r.recipe_id)
        THEN 1::INTEGER ELSE 0::INTEGER END AS saved
        FROM recipes r
        LEFT JOIN users u ON r.created_by = u.user_id
        LEFT JOIN saved_recipes sr ON sr.recipe_saved = r.recipe_id
        LEFT JOIN liked_recipes lr ON r.recipe_id = lr.recipe_liked
        LEFT JOIN disliked_recipes dr ON r.recipe_id = dr.recipe_disliked WHERE
        r.recipe_id IN ( SELECT recipe_saved FROM saved_recipes WHERE
        saved_by = $1 ) GROUP BY r.recipe_id, sr.saved_at, u.user_id;`,
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
