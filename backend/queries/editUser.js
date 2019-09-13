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

// Load input validation
const validateUsernameInput = require("../validation/usernameValidate");

const editUser = (request, response) => {
  const { fullname, username } = request.body;
  console.log(request);

  const errors = validateUsernameInput(request.body);
  // Check validation
  if (Object.keys(errors).length !== 0) {
    return response.status(400).json(errors);
  }
  // check if user isLoggedin before changing names
  pool.connect().then(client => {
    return client
      .query(
        "UPDATE users SET full_name = $1, username = $2 WHERE user_id = 62",
        [fullname, username]
      )
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  editUser
};
