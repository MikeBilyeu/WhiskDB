const db = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../../validation/register");

module.exports = async ({ body: { username, email, password } }, res) => {
  const errors = validateRegisterInput({ username, email, password });
  if (Object.keys(errors).length !== 0) {
    res.status(400).send(errors);
  }

  const { rows } = await db.query(
    `SELECT *
    FROM "USERS"
    WHERE LOWER(email) = LOWER($1)`,
    [email.toLowerCase()]
  );

  if (rows.length) {
    let err = "This email is already registered, Want to Log in?";
    res.status(400).send(err);
  } else {
    try {
      const password_encrypted = await bcrypt.hash(password, 10);
      const { rows } = await db.query(
        `INSERT INTO "USERS" (email, password, username, created_at)
        VALUES (LOWER($1), $2, $3, NOW()) RETURNING user_id`,
        [email.toLowerCase(), password_encrypted, username]
      );
      res.status(201).send(`User added with ID: ${rows[0].user_id}`);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};
