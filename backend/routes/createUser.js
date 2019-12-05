const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Load input validation
const validateRegisterInput = require("../validation/register");

// export our router to be mounted by the parent application
module.exports = router;

router.post("/", async (request, response) => {
  const { username, email, password } = request.body;

  // Form validation
  const errors = validateRegisterInput(request.body);

  // Check validation
  if (Object.keys(errors).length !== 0) {
    response.status(400).json(errors);
  }

  const { rows, rowCount } = await db.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email]
  );

  if (rowCount > 0) {
    if (email === rows[0].email) {
      response
        .status(400)
        .send("This email is already registered, Want to Log in");
    } else if (username === rows[0].username) {
      response.status(400).send("Username is already registered, Sorry");
    }
  } else {
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        password_encrypted = hash;

        try {
          const { rows } = await db.query(
            "INSERT INTO users (username, email, password_encrypted) VALUES ($1, $2, $3) RETURNING user_id",
            [username, email, password_encrypted]
          );

          response.status(201).send(`User added with ID: ${rows[0].user_id}`);
        } catch (err) {
          response.status(400).json(err);
        }
      });
    });
  }
});
