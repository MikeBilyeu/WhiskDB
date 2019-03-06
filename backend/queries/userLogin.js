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
  const { errors, isValid } = validateLoginInput(request.body);
  // Check validation
  if (!isValid) {
    return response.status(400).json(errors);
  }
  const email = request.body.email;
  const password = request.body.password;

  // Swap out mongodb for postgresql

  pool.connect().then(client => {
    return client
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then(res => {
        client.release();
        if (res.rowCount === 0) {
          return response
            .status(404)
            .json({ emailnotfound: "Email not found" });
        }
        const user = res.rows[0];
        console.log(user);
        // Check password
        bcrypt.compare(password, user.password_encrypted).then(isMatch => {
          if (isMatch) {
            console.log("User Matched");
            // User matched
            // Create JWT Payload
            const payload = {
              user_id: user.user_id,
              username: user.username
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
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
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
