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

const validateUsername = require("../validation/usernameValidate");

const editProfile = (request, response) => {
  const { full_name, username } = request.body;
  const { user_id } = request.user; // get user_id from auth
  const errors = validateUsername(username);
  // Check errors for username validation
  if (Object.keys(errors).length !== 0) {
    return response.status(400).json(errors);
  }

  pool.connect().then(client => {
    return client
      .query(
        "UPDATE users SET full_name = $1, username = $2 WHERE user_id = $3",
        [full_name, username, user_id]
      )
      .then(() => {
        const payload = {
          user_id: user_id,
          username: username,
          full_name: full_name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            if (err) throw err;
            response.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  editProfile
};