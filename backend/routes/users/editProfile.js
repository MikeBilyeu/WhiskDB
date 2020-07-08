const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const db = require("../../db");
const validateUsername = require("../../validation/usernameValidate");

module.exports = async (req, res) => {
  let { username, image_url } = req.body;
  const { user_id } = req.user; // get user_id from auth

  const errors = validateUsername(username);
  // Check errors for username validation
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json(errors);
  }

  try {
    const { rowCount } = await db.query(
      `SELECT *
      FROM "USERS"
      WHERE LOWER(username) = LOWER($1)`,
      [username]
    );

    if (rowCount) {
      return res
        .status(409)
        .json({ username: "This username is already taken" });
    }

    await db.query(
      `UPDATE "USERS" SET username = $1, image_url = $2, updated_at = DEFAULT WHERE user_id = $3`,
      [username, image_url, user_id]
    );

    const payload = {
      user_id: user_id,
      username: username,
      image_url: image_url
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
        res.status(200).json({
          success: true,
          token: "Bearer " + token
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
