const pool = require("../utils/connectPool");

const saveRecipe = async (request, response) => {
  const { recipe_id } = request.body;
  const { user_id } = request.user; // Get user_id from auth
  try {
    const client = await pool.connect();
    const res = await client.query(
      `SELECT *
        FROM saved_recipes
        WHERE saved_by = $1
          AND recipe_saved = $2`,
      [user_id, recipe_id]
    );

    if (res.rowCount > 0) {
      // Delete saved recipe from db
      await client.query(
        `DELETE
          FROM saved_recipes
          WHERE saved_by = $1
            AND recipe_saved = $2`,
        [user_id, recipe_id]
      );
      response.status(200).send("unsaved");
    }
    // Add saved recipe to db
    await client.query(
      `INSERT INTO saved_recipes (saved_by, recipe_saved)
            VALUES ($1, $2)`,
      [user_id, recipe_id]
    );
    response.status(200).send("saved");
  } catch (err) {
    response.status(500).json(err);
  }
};

module.exports = {
  saveRecipe
};
