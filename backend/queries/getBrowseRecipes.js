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
  console.log("Browse", request.query);
  let browseRecipes = [];
  let recipe_ids = [];

  //connect pool
  pool.connect().then(client => {
    // query the recipe table
    return client
      .query("SELECT recipe_id, title, image_url, total_time_mins FROM recipes")
      .then(res => {
        client.release();
        if (res.rows.length === 0) {
          response.status(200).json(browseRecipes);
        }
        browseRecipes = [...res.rows];

        recipe_ids = res.rows.map(recipe => recipe.recipe_id);
      })
      .then(() => {
        for (let id of recipe_ids) {
          // search like table with recipe id to get number of likes
          client
            .query(
              "SELECT recipe_liked FROM liked_recipes WHERE recipe_liked = $1",
              [id]
            )
            .then(res => {
              let likes = res.rowCount;
              //store likes in browseRecipes
              browseRecipes.map(recipe => {
                if (recipe.recipe_id === id) {
                  return (recipe.likes = likes);
                }
              });
            });
          // search dislike table with recipe id to get number of dislikes
          client
            .query(
              "SELECT recipe_disliked FROM disliked_recipes WHERE recipe_disliked = $1",
              [id]
            )
            .then(res => {
              let dislikes = res.rowCount;
              //store dislikes in browseRecipes
              browseRecipes.map(recipe => {
                if (recipe.recipe_id === id) {
                  return (recipe.dislikes = dislikes);
                }
              });
              // This will run when the last recipe has finished
              if (id === recipe_ids[recipe_ids.length - 1]) {
                response.status(200).json(browseRecipes);
              }
            });
        }
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
