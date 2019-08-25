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

const getEmails = (request, response) => {
  const { email } = request.query;

  pool.connect().then(client => {
    return client
      .query("SELECT * FROM users WHERE LOWER(email) = LOWER($1)", [email])
      .then(res => {
        client.release();
        if (res.rowCount > 0) {
          return response.status(409).json({ usernmae: "Email is in use" });
        } else {
          return response.status(200).json({ usernmae: "Email is not in use" });
        }
      })
      .catch(e => {
        client.release();
        return response.status(500);
      });
  });
};

module.exports = {
  getEmails
};
