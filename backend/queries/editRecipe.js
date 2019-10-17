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

const editRecipe = (request, response) => {
  const { user_id } = request.user;
  const { recipe_id, created_by } = request.body;
  const title = request.body.title.trim();

  if (user_id !== created_by) {
    return response.status(401).send("You can't edit this recipe");
  }
  pool.connect().then(client => {
    return client
      .query(`UPDATE recipes SET title = $1 WHERE recipe_id = $2`, [
        title,
        recipe_id
      ])
      .then(() => {
        return response.status(200).send("Changes saved!");
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  editRecipe
};
