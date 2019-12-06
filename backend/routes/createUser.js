const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");

module.exports = router;

router.post("/", async ({ body: { username, email, password } }, response) => {
  const errors = validateRegisterInput({ username, email, password });
  if (Object.keys(errors).length !== 0) {
    response.status(400).json(errors);
  }

  const { rows } = await db.query(
    `SELECT *
    FROM users
    WHERE username = $1
      OR email = $2`,
    [username, email]
  );

  if (rows.length) {
    let err = "Username is already registered, Sorry";
    if (email === rows[0].email) {
      err = "This email is already registered, Want to Log in?";
    }
    response.status(400).send(err);
  } else {
    try {
      const password_encrypted = await bcrypt.hash(password, 10);
      const { rows } = await db.query(
        `INSERT INTO users (username, email, password_encrypted)
        VALUES ($1, $2, $3) RETURNING user_id`,
        [username, email, password_encrypted]
      );
      response.status(201).send(`User added with ID: ${rows[0].user_id}`);
    } catch (err) {
      response.status(400).json(err);
    }
  }
});
