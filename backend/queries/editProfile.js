const pool = require("../utils/connectPool");
const jwt = require("jsonwebtoken");
const validateUsername = require("../validation/usernameValidate");

const editProfile = async (request, response) => {
  const { full_name, username } = request.body;
  const { user_id } = request.user; // get user_id from auth
  const errors = validateUsername(username);
  // Check errors for username validation
  if (Object.keys(errors).length !== 0) {
    response.status(400).json(errors);
  }

  try {
    const client = await pool.connect;
    await client.query(
      `UPDATE users SET full_name = $1,
      username = $2 WHERE user_id = $3`,
      [full_name, username, user_id]
    );

    const payload = {
      user_id: user_id,
      username: username,
      full_name: full_name
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
  } catch (err) {
    response.status(400).json(err);
  }
};

module.exports = {
  editProfile
};
