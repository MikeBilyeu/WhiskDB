const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const db = require("../../db");

module.exports = async (req, res) => {
  let { name, diet, image_url } = req.body;
  const { user_id } = req.user; // get user_id from auth
  name = name && name.trim();
  // Check errors for username validation
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json(errors);
  }

  try {
    await db.query(
      `UPDATE "USERS" SET name = $1, diet = $2, image_url = $3 WHERE user_id = $4`,
      [name, diet, image_url, user_id]
    );

    const payload = {
      user_id: user_id,
      name: name,
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
