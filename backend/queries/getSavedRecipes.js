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
    // searching saved recipe table with user id
    // SELECT r.recipe_id, r.title, count(lr.*) AS likes, count(dr.*) AS dislikes FROM recipes r
    // LEFT JOIN liked_recipes lr ON r.recipe_id = lr.recipe_liked LEFT JOIN disliked_recipes dr ON r.recipe_id = dr.recipe_disliked
    // WHERE r.recipe_id IN (
    //   SELECT recipe_saved FROM saved_recipes WHERE saved_by = $1
    // ) GROUP BY r.recipe_id;
    return client
      .query("SELECT recipe_saved FROM saved_recipes WHERE saved_by = $1", [
        user_id
      ])
      .then(res => {
        client.release();

        // make array of recipe ids to search
        let recipe_ids = res.rows.map(recipe => recipe.recipe_saved);
        let savedRecipes = [];

        // response if user has no saved recipes else it wont respond
        if (recipe_ids.length === 0) {
          response.status(200).json(savedRecipes);
        }
        // search recipes
        client
          .query(
            "SELECT recipe_id, title, image_url, total_time_mins FROM recipes WHERE recipe_id = ANY ($1)",
            [recipe_ids]
          )
          .then(res => {
            savedRecipes = [...res.rows];
          })
          .then(() => {
            // loop throughe the array of ids and get the recipe id and search
            // the likes table wit it

            for (let id of recipe_ids) {
              // search like table with recipe id to get number of likes
              client
                .query(
                  "SELECT recipe_liked FROM liked_recipes WHERE recipe_liked = $1",
                  [id]
                )
                .then(res => {
                  let likes = res.rowCount;
                  //store likes in savedRecipes
                  savedRecipes.map(recipe => {
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
                  //store dislikes in savedRecipes
                  savedRecipes.map(recipe => {
                    if (recipe.recipe_id === id) {
                      return (recipe.dislikes = dislikes);
                    }
                  });
                  // This will run when the last recipe has finished
                  if (id === recipe_ids[recipe_ids.length - 1]) {
                    response.status(200).json(savedRecipes);
                  }
                });
            }
          });
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
