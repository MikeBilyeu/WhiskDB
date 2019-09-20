const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const postReview = (request, response) => {
  const { recipe_id, rating, comment } = request.body;

  const { user_id } = request.user; // get user_id from auth

  //prevent user from submiting multiple reviews
  // validate rating and comment

  pool.connect().then(client => {
    return client
      .query(
        "INSERT INTO reviews (recipe_id, rating, comment, user_id) VALUES ($1, $2, $3, $4)",
        [recipe_id, rating, comment, user_id]
      )
      .then(res => {
        return response.status(200);
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  postReview
};
