const pool = require("../utils/connectPool");

const getUsernames = async (request, response) => {
  const { username } = request.query;

  try {
    const client = await pool.connect();
    const res = await client.query(
      `SELECT *
      FROM users
      WHERE LOWER(username) = LOWER($1)`,
      [username]
    );

    if (res.rowCount > 0) {
      response.status(409).json({ username: "This username is already taken" });
    }
    response.status(200).json({ username: "Username is available" });
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  getUsernames
};
