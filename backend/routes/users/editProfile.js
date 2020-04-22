const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const db = require("../../db");
const validateUsername = require("../../validation/usernameValidate");

module.exports = async (req, res) => {
  let { full_name, username, diet, image_url } = req.body;
  const { user_id } = req.user; // get user_id from auth
  const errors = validateUsername(username);
  full_name = full_name && full_name.trim();
  // Check errors for username validation
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json(errors);
  }

  try {
    await db.query(
      `UPDATE users SET full_name = $1,
       username = $2, diet = $3, image_url = $4 WHERE user_id = $5`,
      [full_name, username, diet, image_url, user_id]
    );

    const payload = {
      user_id: user_id,
      username: username,
      full_name: full_name,
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
