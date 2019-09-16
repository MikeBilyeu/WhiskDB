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

const getUser = (request, response) => {
  const { user_id } = request.user;

  pool.connect().then(client => {
    return client
      .query(
        "SELECT username, full_name, email FROM users WHERE user_id = $1",
        [user_id]
      )
      .then(res => {
        client.release();
        if (res.rowCount === 0) {
          return response.status(401);
        }
        const user = res.rows[0];
        response.status(200).json(user);
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  getUser
};
