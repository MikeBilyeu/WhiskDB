const db = require("../../db");
module.exports = async (req, res) => {
  const { recipe_id } = req.body;
  const { user_id } = req.user; // Get user_id from auth
  try {
    // Add saved recipe to db
    await db.query(
      `INSERT INTO saved_recipes (saved_by, recipe_saved)
              VALUES ($1, $2)`,
      [user_id, recipe_id]
    );
    res.status(200).send("saved");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// const { rowCount } = await db.query(
//   `SELECT *
//       FROM saved_recipes
//       WHERE saved_by = $1
//         AND recipe_saved = $2`,
//   [user_id, recipe_id]
// );

// if (rowCount > 0) {
//   // Delete saved recipe from db
//   await db.query(
//     `DELETE
//         FROM saved_recipes
//         WHERE saved_by = $1
//           AND recipe_saved = $2`,
//     [user_id, recipe_id]
//   );
//   res.status(200).send("unsaved");
//   return;
// }
