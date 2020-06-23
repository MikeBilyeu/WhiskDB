const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT INITCAP(rk.keyword) AS keyword, COUNT(1)
       FROM "RECIPES_KEYWORDS" rk
       JOIN "KEYWORDS" k USING(keyword)
       GROUP BY rk.keyword
       HAVING COUNT(1) >= 10
       ORDER BY (count) DESC
       LIMIT 5`
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
