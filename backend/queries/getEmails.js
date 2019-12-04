const pool = require("../utils/connectPool");

const getEmails = async (request, response) => {
  const { email } = request.query;

  try {
    const client = await pool.connect();
    await client.query(`SELECT * FROM users WHERE LOWER(email) = LOWER($1)`, [
      email
    ]);
    client.release();
    if (res.rowCount > 0) {
      return response.status(409).json({ usernmae: "Email is in use" });
    }
    return response.status(200).json({ usernmae: "Email is not in use" });
  } catch (err) {
    return response.status(500).json(err);
  }
};

module.exports = {
  getEmails
};
