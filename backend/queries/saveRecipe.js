const Pool = require("pg").Pool;

const keys = require("../config/keys");

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const saveRecipe = (request, response) => {
  const { recipe_id } = request.body;
  const { user_id } = request.user;

  pool.connect().then(client => {
    return client
      .query(
        "SELECT * FROM saved_recipes WHERE saved_by = $1 AND recipe_saved = $2",
        [user_id, recipe_id]
      )
      .then(res => {
        if (res.rowCount > 0) {
          //delete from db
          client
            .query(
              "DELETE FROM saved_recipes WHERE saved_by = $1 AND recipe_saved = $2",
              [user_id, recipe_id]
            )
            .then(res => response.status(200).send("unsaved"));
        } else if (res.rowCount === 0) {
          // add to db
          client
            .query(
              "INSERT INTO saved_recipes (saved_by, recipe_saved) VALUES ($1, $2)",
              [user_id, recipe_id]
            )
            .then(res => response.status(200).send("saved"));
        }
      })
      .catch(err => {
        client.release();
        console.log(err);
      });
  });
};

module.exports = {
  saveRecipe
};
