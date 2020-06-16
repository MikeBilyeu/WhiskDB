const db = require("../../db");

module.exports = async (req, res) => {
  const { email } = req.query;

  try {
    const { rowCount } = await db.query(
      `SELECT *
      FROM "USERS"
      WHERE LOWER(email) = LOWER($1)`,
      [email]
    );

    if (rowCount > 0) {
      return res.status(409).json({ email: "Email is already in use" });
    }
    res.status(200).json({ email: "Email available" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
