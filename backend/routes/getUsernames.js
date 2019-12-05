const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

router.get("/", async (request, response) => {
  const { username } = request.query;

  try {
    const { rowCount } = await db.query(
      `SELECT *
      FROM users
      WHERE LOWER(username) = LOWER($1)`,
      [username]
    );

    if (rowCount > 0) {
      response.status(409).json({ username: "This username is already taken" });
    }
    response.status(200).json({ username: "Username is available" });
  } catch (err) {
    response.status(500).json(err);
  }
});
