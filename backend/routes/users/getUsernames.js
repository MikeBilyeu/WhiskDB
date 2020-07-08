const db = require("../../db");

module.exports = async (req, res) => {
  const { username } = req.query;

  try {
    const { rowCount } = await db.query(
      `SELECT *
      FROM "USERS"
      WHERE LOWER(username) = LOWER($1)`,
      [username]
    );

    if (rowCount > 0) {
      return res
        .status(409)
        .json({ username: "This username is already taken" });
    }
    res.status(200).json({ username: "This username is available" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
