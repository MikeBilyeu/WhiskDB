const Router = require("express-promise-router");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = new Router();

module.exports = router;

router.delete(
  "/delete-user",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user; // Get user_id from auth
    try {
      await db.query(
        `DELETE
      FROM users
      WHERE user_id = $1`,
        [user_id]
      );
      response.status(200).json("User removed");
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
