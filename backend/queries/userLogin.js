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

const validateLoginInput = require("../validation/login");

const userLogin = (request, response) => {
  // Form validation
  const errors = validateLoginInput(request.body);
  // checking if login validator has errors

  if (Object.keys(errors).length !== 0) {
    return response.status(400).json(errors);
  }
  const email = request.body.email;
  const password = request.body.password;

  pool.connect().then(client => {
    return client
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then(res => {
        client.release();
        if (res.rowCount === 0) {
          return response.status(401).json({
            email: "We can't find an account with that email address"
          });
        }
        const user = res.rows[0];

        // Check password
        bcrypt.compare(password, user.password_encrypted).then(isMatch => {
          if (isMatch) {
            console.log("User Matched");
            // User matched
            // Create JWT Payload
            const payload = {
              user_id: user.user_id
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
          } else {
            return response
              .status(401)
              .json({ password: "Password incorrect" });
          }
        });
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  userLogin
};
