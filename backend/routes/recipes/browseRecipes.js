const db = require("../../db");

module.exports = async (req, res) => {
  let { category, diet, sort, offset, user_id } = JSON.parse(
    JSON.stringify(req.query).toLowerCase()
  );
  console.log("data input", req.query);

  const LIMIT = 12;
  const OFFSETNUM = offset * LIMIT;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT r.*
      FROM "RECIPES" r;`,
      []
    );
    if (rowCount < 1) {
      res.status(204).send();
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
