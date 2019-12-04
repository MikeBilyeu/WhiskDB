const pool = require("../utils/connectPool");

const postReview = async (request, response) => {
  const { recipe_id, rating, comment } = request.body;
  const { user_id } = request.user; // Get user_id from auth
  try {
    const client = await pool.connect;
    await client.query(
      `INSERT INTO reviews (recipe_id, rating, COMMENT, user_id)
      VALUES ($1, $2, $3, $4)`,
      [recipe_id, rating, comment, user_id]
    );
    response.status(200).json("Review sent");
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  postReview
};
