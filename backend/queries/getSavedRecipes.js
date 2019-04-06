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
    // Searching saved recipes where saved_by == user_id
    return client
      .query("SELECT * FROM saved_recipes WHERE saved_by = $1", [user_id]) //1
      .then(res => {
        let savedRecipe_ids = [...res.rows];
        let savedRecipeData = [];
        // Response if user has 0 saved recipes
        if (savedRecipe_ids.length === 0) {
          response.status(200).json(savedRecipeData);
        }
        // Loop through recipe ids and get the data for each recipe
        for (let i = 0; i < savedRecipe_ids.length; i++) {
          let recipe_id = savedRecipe_ids[i].recipe_saved;
          // getting recipe data from the recipe table
          let currentRecipeData = {};
          // get the data for each recipe
          client
            .query("SELECT * FROM recipes WHERE recipe_id = $1", [recipe_id]) //2
            .then(res => {
              let { title, total_time_mins, image_url } = res.rows[0];
              currentRecipeData = {
                recipe_id,
                title,
                total_time_mins,
                image_url
              };
            })
            .then(() => {
              // get number of likes
              client
                .query("SELECT * FROM liked_recipes WHERE recipe_liked = $1", [
                  recipe_id
                ]) //3
                .then(res => {
                  let likes = res.rowCount;
                  currentRecipeData = { ...currentRecipeData, likes };
                });
            })
            .then(() => {
              // get number of dislikes
              client
                .query(
                  "SELECT * FROM disliked_recipes WHERE recipe_disliked = $1",
                  [recipe_id]
                ) //4
                .then(res => {
                  let dislikes = res.rowCount;
                  currentRecipeData = { ...currentRecipeData, dislikes };
                  savedRecipeData = [...savedRecipeData, currentRecipeData];
                  // responed when all data has been added

                  if (i === savedRecipe_ids.length - 1) {
                    response.status(200).json(savedRecipeData);
                  }
                });
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
  getSavedRecipes
};
