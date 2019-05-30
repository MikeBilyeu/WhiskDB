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
  search = search.trim();
  console.log(search.length);
  //connect pool
  pool.connect().then(client => {
    // query the recipe table
    return client
      .query(
        `SELECT r.recipe_id, r.title, r.total_time_mins, r.image_url,
        r.created_at, CASE WHEN COUNT(lr.*) + COUNT(dr.*) = 0 THEN 0
        ELSE (count(lr.*) / CAST (COUNT(lr.*) + COUNT(dr.*) AS FLOAT)) * 5
        END
        AS rating,
        CAST(COUNT(lr.*) + COUNT(dr.*) AS INTEGER) AS votes FROM recipes r LEFT JOIN
        liked_recipes lr ON r.recipe_id = lr.recipe_liked LEFT JOIN
        disliked_recipes dr ON r.recipe_id = dr.recipe_disliked WHERE
        r.title ILIKE '%' || $1 || '%'
        GROUP BY r.recipe_id
        ORDER BY rating DESC, votes DESC;
`,
        [search]
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
