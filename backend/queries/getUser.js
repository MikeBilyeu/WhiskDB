const pool = require("../utils/connectPool");

const getUser = async (request, response) => {
  const { user_id } = request.user; // Get user_id from auth

  try {
    const client = await pool.connect();
    const res = await client.query(
      `SELECT user_id,
             username,
             full_name,
             email
      FROM users
      WHERE user_id = $1`,
      [user_id]
    );
    if (res.rowCount === 0) {
      response.status(401);
    }
    const user = res.rows[0];
    response.status(200).json(user);
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  getUser
};
