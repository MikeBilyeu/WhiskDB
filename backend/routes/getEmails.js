const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

router.get("/", async (request, response) => {
  const { email } = request.query;

  try {
    const res = await db.query(
      `SELECT *
      FROM users
      WHERE LOWER(email) = LOWER($1)`,
      [email]
    );

    if (res.rowCount > 0) {
      return response.status(409).json({ email: "Email is already in use" });
    }
    response.status(200);
  } catch (err) {
    console.error(err);
    response.status(500).json(err);
  }
});
