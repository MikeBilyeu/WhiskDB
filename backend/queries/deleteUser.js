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

const deleteUser = (request, response) => {
  const { user_id } = request.user; // get user_id from auth

  pool.connect().then(client => {
    return client
      .query(`DELETE FROM users WHERE user_id = $1`, [user_id])
      .then(res => {})
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  deleteUser
};
