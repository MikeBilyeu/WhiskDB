const pool = require("../utils/connectPool");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInput = require("../validation/register");

const createUser = async (request, response) => {
  const { username, email, password } = request.body;

  // Form validation
  const errors = validateRegisterInput(request.body);
  // Check validation
  if (Object.keys(errors).length !== 0) {
    return response.status(400).json(errors);
  }

  const client = await pool.connect();
  const res = await client.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email]
  );

  if (res.rowCount > 0) {
    if (email === res.rows[0].email) {
      return response
        .status(400)
        .send("This email is already registered, Want to Log in");
    } else if (username === res.rows[0].username) {
      return response.status(400).send("Username is already registered, Sorry");
    }
  } else {
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        password_encrypted = hash;

        try {
          const result = await client.query(
            "INSERT INTO users (username, email, password_encrypted) VALUES ($1, $2, $3) RETURNING user_id",
            [username, email, password_encrypted]
          );
          // client.release();
          response
            .status(201)
            .send(`User added with ID: ${result.rows[0].user_id}`);
        } catch (err) {
          // client.release();
          return response.status(400).json(err);
        }
      });
    });
  }
};

module.exports = {
  createUser
};
