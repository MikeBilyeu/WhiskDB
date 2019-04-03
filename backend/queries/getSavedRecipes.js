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
  pool.connect().then(client => {
    return client
      .query("SELECT * FROM saved_recipes WHERE saved_by = $1", [user_id])
      .then(res => {
        let savedRecipeData = [];
        for (let i = 0; i < res.rows.length; i++) {
          let recipe_id = res.rows[i].recipe_saved;
          // getting the title and time from the recipe table
          client
            .query("SELECT * FROM recipes WHERE recipe_id = $1", [recipe_id])
            .then(res => {
              let { title, total_time_mins, image_url } = res.rows[0];
              let currentRecipeData = {
                recipe_id,
                title,
                total_time_mins,
                image_url
              };
              // get number of likes
              client
                .query("SELECT * FROM liked_recipes WHERE recipe_liked = $1", [
                  recipe_id
                ])
                .then(res => {
                  let likes = res.rowCount;
                  currentRecipeData = { ...currentRecipeData, likes };
                });
              // get number of dislikes
              client
                .query(
                  "SELECT * FROM disliked_recipes WHERE recipe_disliked = $1",
                  [recipe_id]
                )
                .then(res => {
                  let dislikes = res.rowCount;
                  currentRecipeData = { ...currentRecipeData, dislikes };
                })
                .then(() => {
                  savedRecipeData = [...savedRecipeData, currentRecipeData];
                  if (i === res.rows.length) {
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
