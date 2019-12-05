const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
module.exports = router;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user; // Get user_id from auth

    try {
      const { rows, rowCount } = await db.query(
        `SELECT user_id,
             username,
             full_name,
             email
      FROM users
      WHERE user_id = $1`,
        [user_id]
      );
      if (rowCount === 0) {
        response.status(401);
      }
      const user = rows[0];
      response.status(200).json(user);
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
