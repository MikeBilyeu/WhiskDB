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
  console.log(request.query.recipe_id);
  const recipe_id = request.query.recipe_id;

  // promise - checkout a client
  pool.connect().then(client => {
    return client
      .query("SELECT * FROM recipes WHERE recipe_id = $1", [recipe_id])
      .then(res => {
        client.release();
        response.status(200).json(res.rows[0]);
      })
      .catch(e => {
        client.release();
        console.log(err.stack);
      });
  });
};

module.exports = {
  getRecipe
};
