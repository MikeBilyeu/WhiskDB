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

const voteRecipe = (request, response) => {
  const { vote, user_id, recipe_id } = request.body;

  // promise - checkout a client
  pool.connect().then(client => {
    // check the disliked_recipes for user_id and recipe id
    if (vote === "liked") {
      // remove from disliked to prevent a double vote
      return client
        .query(
          "DELETE FROM disliked_recipes WHERE disliked_by = $1 AND recipe_disliked = $2",
          [user_id, recipe_id]
        )
        .then(() => {
          client
            .query(
              "SELECT * FROM liked_recipes WHERE liked_by = $1 AND recipe_liked = $2",
              [user_id, recipe_id]
            )
            .then(res => {
              client.release();
              // remove from liked to prevent a double vote / remove like
              if (res.rowCount > 0) {
                client
                  .query(
                    "DELETE FROM liked_recipes WHERE liked_by = $1 AND recipe_liked = $2",
                    [user_id, recipe_id]
                  )
                  .then(res => response.status(200).send("like removed"));
              } else {
                // insert like
                client
                  .query(
                    "INSERT INTO Liked_recipes (liked_by, recipe_liked) VALUES ($1, $2)",
                    [user_id, recipe_id]
                  )
                  .then(res => response.status(200).send("like"));
              }
            });
        })
        .catch(err => {
          client.release();
          console.log(err);
        });
    } else if (vote === "disliked") {
      // check the disliked_recipes for user_id and recipe id
      // remove from disliked to prevent a double vote
      return client
        .query(
          "DELETE FROM liked_recipes WHERE liked_by = $1 AND recipe_liked = $2",
          [user_id, recipe_id]
        )
        .then(() => {
          client
            .query(
              "SELECT * FROM disliked_recipes WHERE disliked_by = $1 AND recipe_disliked = $2",
              [user_id, recipe_id]
            )
            .then(res => {
              client.release();
              // remove from disliked to prevent a double vote / remove dislike
              if (res.rowCount > 0) {
                client
                  .query(
                    "DELETE FROM disliked_recipes WHERE disliked_by = $1 AND recipe_disliked = $2",
                    [user_id, recipe_id]
                  )
                  .then(res => response.status(200).send("dislike removed"));
              } else {
                // insert dislike
                client
                  .query(
                    "INSERT INTO disLiked_recipes (disliked_by, recipe_disliked) VALUES ($1, $2)",
                    [user_id, recipe_id]
                  )
                  .then(res => response.status(200).send("dislike"));
              }
            });
        })
        .catch(err => {
          client.release();
          console.log(err);
        });
    }
  });
};

module.exports = {
  voteRecipe
};
