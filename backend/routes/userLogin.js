const Router = require("express-promise-router");
const db = require("../db");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateLoginInput = require("../validation/login");

const router = new Router();

module.exports = router;

router.post("/", async (request, response) => {
  // Form validation
  const errors = validateLoginInput(request.body);
  // checking if login validator has errors

  if (Object.keys(errors).length !== 0) {
    return response.status(400).json(errors);
  }
  const email = request.body.email;
  const password = request.body.password;

  try {
    const { rowCount, rows } = await db.query(
      `SELECT *
        FROM users
        WHERE email = $1`,
      [email]
    );

    if (rowCount === 0) {
      response.status(401).json({
        email: "We can't find an account with that email address"
      });
    }

    const user = rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_encrypted);
    if (isMatch) {
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
      response.status(401).json({ password: "Password incorrect" });
    }
  } catch (err) {
    response.status(500).json(err);
  }
});
