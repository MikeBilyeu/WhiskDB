const pool = require("../utils/connectPool");

const getMyRecipes = async (request, response) => {
  const { user_id } = request.user; // Get user_id from auth

  try {
    const client = await pool.connect();
    const res = await client.query(
      `SELECT r.recipe_id,
              r.title,
              r.image_url,
              r.created_at,
              r.total_time_mins,
              COALESCE(AVG(rw.rating), 0) AS rating,
              CAST(count(rw.*) AS INTEGER) AS num_reviews
      FROM recipes r
      LEFT JOIN reviews rw ON r.recipe_id = rw.recipe_id
      WHERE created_by = $1
      GROUP BY r.recipe_id,
               rw.recipe_id
      ORDER BY created_at DESC;`,
      [user_id]
    );
    client.release();
    return response.status(200).json(res.rows);
  } catch (err) {
    return response.status(500).json(err);
  }
};

module.exports = {
  getMyRecipes
};
