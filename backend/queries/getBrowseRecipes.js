const Pool = require("pg").Pool;

const keys = require("../config/keys");

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getBrowseRecipes = (request, response) => {
  console.log(request.query);
  let { search, meal, diet, cuisine, sort } = JSON.parse(
    request.query.browseData.toLowerCase()
  );

  //connect pool
  pool.connect().then(client => {
    // query the recipe table
    return client
      .query(
        `SELECT r.recipe_id, r.title, r.total_time_mins, r.image_url,
        count(lr.*) AS likes, count(dr.*) AS dislikes FROM recipes r LEFT JOIN
        liked_recipes lr ON r.recipe_id = lr.recipe_liked LEFT JOIN
        disliked_recipes dr ON r.recipe_id = dr.recipe_disliked WHERE
        r.recipe_id IN
        ( SELECT recipe FROM recipes_join_categories WHERE
          category in (SELECT category_id from categories
            WHERE category_name = $1))
        GROUP BY r.recipe_id`,
        [meal]
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
  getBrowseRecipes
};
