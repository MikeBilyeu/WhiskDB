const pool = require("../utils/connectPool");
const jwt = require("jsonwebtoken");

const deleteUser = async (request, response) => {
  const { user_id } = request.user; // Get user_id from auth
  try {
    const client = await pool.connect();
    await client.query(
      `DELETE
    FROM users
    WHERE user_id = $1`,
      [user_id]
    );
    response.status(200).json("User removed");
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  deleteUser
};
