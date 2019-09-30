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
        r.created_at, COALESCE(AVG(rw.rating), 0) AS rating,
        CAST(count(rw.*) AS INTEGER) AS num_reviews,
        sr.saved_by = $2 AS saved FROM recipes r
        LEFT JOIN users u ON r.created_by = u.user_id
        LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
        LEFT JOIN saved_recipes sr ON r.recipe_id = sr.recipe_saved
        WHERE document_vectors @@ to_tsquery($1)
        GROUP BY r.recipe_id, u.user_id, sr.saved_by
        ORDER BY rating DESC, num_reviews DESC;
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
