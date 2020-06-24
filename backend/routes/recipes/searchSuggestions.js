const db = require("../../db");

module.exports = async (req, res) => {
  const { search } = req.query;
  let textSearch = search.trim().replace(/\s+/g, ":* | ") + ":*";
  try {
    const { rows } = await db.query(
      `SELECT INITCAP(rk.keyword) AS keyword, COUNT(1)
       FROM "RECIPES_KEYWORDS" rk
       JOIN "KEYWORDS" k USING(keyword)
       WHERE to_tsquery($1:*) @@ rk.ts_keyword;
       GROUP BY rk.keyword
       HAVING COUNT(1) >= 10
       ORDER BY (count) DESC
       LIMIT 5`,
      [search]
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
