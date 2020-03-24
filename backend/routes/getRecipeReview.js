const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const passport = require("passport");
module.exports = router;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { recipe_id } = request.query;
    const { user_id } = request.user; // Get user_id from auth
    try {
      const { rows, rowCount } = await db.query(
        `SELECT rw.rating,
               rw.comment
        FROM reviews rw
        WHERE rw.recipe_id = $1
          AND rw.user_id = $2
        LIMIT 1`,
        [recipe_id, user_id]
      );

      if (rowCount < 1) {
        response.status(204).send();
      } else {
        response.status(200).json(rows[0]);
      }
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
