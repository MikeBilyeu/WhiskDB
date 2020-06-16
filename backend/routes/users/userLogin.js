const db = require("../../db");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateLoginInput = require("../../validation/login");

module.exports = async (req, res) => {
  // Form validation
  const errors = validateLoginInput(req.body);
  // checking if login validator has errors

  if (Object.keys(errors).length !== 0) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  try {
    const { rowCount, rows } = await db.query(
      `SELECT *
        FROM "USERS"
        WHERE email = $1`,
      [email]
    );

    if (rowCount === 0) {
      res.status(401).json({
        email: "We can't find an account with that email address"
      });
    }

    const user = rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
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
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      res.status(401).json({ password: "Password incorrect" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
