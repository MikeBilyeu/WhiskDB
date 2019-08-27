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
            .status(409)
            .json({ username: "This username is already taken" });
        } else {
          return response
            .status(200)
            .json({ username: "Username is available" });
        }
      })
      .catch(e => {
        client.release();
        return response.status(500);
      });
  });
};

module.exports = {
  getUsernames
};
