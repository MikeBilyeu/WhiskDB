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
    let recipeData = {};
    let created_by = "";
    //Getting recipe data
    return (
      client
        .query("SELECT * FROM recipes WHERE recipe_id = $1", [recipe_id])
        .then(res => {
          recipeData = res.rows[0];
          created_by = res.rows[0].created_by;
        })
        //getting the username from the users table
        .then(() => {
          client
            .query("SELECT username FROM users WHERE user_id = $1", [
              created_by
            ])
            .then(res => {
              recipeData = { ...recipeData, username: res.rows[0].username };
            });
        })
        .then(() => {
          // checking if user is auth
          client.release();
          if (user_id !== null) {
            client
              .query(
                "SELECT * FROM liked_recipes WHERE liked_by = $1 AND recipe_liked = $2",
                [user_id, recipe_id]
              )
              .then(res => {
                // checking liked table
                if (res.rowCount > 0) {
                  recipeData = { ...recipeData, vote: "liked" };
                  response.status(200).json(recipeData);
                } else {
                  // chekcing disliked table if not found in liked table
                  client
                    .query(
                      "SELECT * FROM disliked_recipes WHERE disliked_by = $1 AND recipe_disliked = $2",
                      [user_id, recipe_id]
                    )
                    .then(res => {
                      if (res.rowCount > 0) {
                        recipeData = { ...recipeData, vote: "disliked" };
                        response.status(200).json(recipeData);
                      } else {
                        response.status(200).json(recipeData);
                      }
                    });
                }
              });
          } else {
            // response if user is not auth
            response.status(200).json(recipeData);
          }
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
        })
    );
  });
};

module.exports = {
  getRecipe
};
