const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
module.exports = router;

router.post(
  "/recipe-review",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { recipe_id, rating, comment } = request.body;
    const { user_id } = request.user; // Get user_id from auth
    try {
      await db.query(
        `INSERT INTO reviews (recipe_id, rating, COMMENT, user_id)
        VALUES ($1, $2, $3, $4)`,
        [recipe_id, rating, comment, user_id]
      );
      response.status(200).json("Review sent");
    } catch (err) {
      response.status(500).json(err);
    }
  }
);
