const Pool = require("pg").Pool;

const keys = require("../config/keys");

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getSearchRecipes = (request, response) => {
  let { search } = JSON.parse(request.query.browseData.toLowerCase());
  const { user_id } = request.query;
  search = search.trim();
  //connect pool
  pool.connect().then(client => {
    // query the recipe table
    return client
      .query(
        `SELECT r.recipe_id, u.username AS username, r.title, r.total_time_mins, r.image_url,
        r.created_at, CASE WHEN COUNT(lr.*) + COUNT(dr.*) = 0 THEN 0
        ELSE (count(lr.*) / CAST (COUNT(lr.*) + COUNT(dr.*) AS FLOAT)) * 5
        END
        AS rating,
        CAST(COUNT(lr.*) + COUNT(dr.*) AS INTEGER) AS votes,
        CASE WHEN EXISTS ( SELECT * FROM saved_recipes WHERE saved_by = $2 AND
          recipe_saved = r.recipe_id)
        THEN 1::INTEGER ELSE 0::INTEGER END AS saved FROM recipes r
        LEFT JOIN users u ON r.created_by = u.user_id
        LEFT JOIN liked_recipes lr ON r.recipe_id = lr.recipe_liked
        LEFT JOIN disliked_recipes dr ON r.recipe_id = dr.recipe_disliked
        WHERE document_vectors @@ to_tsquery($1)
        GROUP BY r.recipe_id, u.user_id
        ORDER BY rating DESC, votes DESC;
`,
        [search, user_id]
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
  getSearchRecipes
};
