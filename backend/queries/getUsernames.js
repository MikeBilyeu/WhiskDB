const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const keys = require("../config/keys");

// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const getUsernames = (request, response) => {
  const { username } = request.query;

  pool.connect().then(client => {
    return client
      .query("SELECT * FROM users WHERE LOWER(username) = LOWER($1)", [
        username
      ])
      .then(res => {
        client.release();
        if (res.rowCount > 0) {
          return response
            .status(204)
            .json({ usernmae: "Username is unavailable" });
        } else {
          return response
            .status(200)
            .json({ usernmae: "Username is available" });
        }
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  getUsernames
};
