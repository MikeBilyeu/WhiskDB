const db = require("../../db");

module.exports = async (req, res) => {
  const { recipeId } = req.query;
  const { user_id } = req.user;

  try {
    await db.query(
      `BEGIN;
      DELETE FROM "INGREDIENTS" i WHERE i.recipe_id = ${recipeId};
      DELETE FROM "USERS_RECIPES" ur WHERE ur.recipe_id = ${recipeId};
      DELETE FROM "RECIPES_KEYWORDS" rk WHERE rk.recipe_id = ${recipeId};
      DELETE FROM "INGREDIENTS" i WHERE i.recipe_id = ${recipeId};
      DELETE FROM "RECIPES_SAVES" rs WHERE rs.recipe_id = ${recipeId};
      DELETE FROM "RECIPES_CATEGORIES" rc WHERE rc.recipe_id = ${recipeId};
      DELETE FROM "RECIPES_SEARCHES" rs WHERE rs.recipe_id = ${recipeId};
      DELETE FROM "RECIPES_SAVES" rsaves WHERE rsaves.recipe_id = ${recipeId};
      DELETE FROM "RECIPES_REVIEWS" rr WHERE rr.recipe_id = ${recipeId};
      DELETE FROM "RECIPES" r WHERE r.recipe_id = ${recipeId};
      COMMIT;`
    );

    res.status(200).send("Recipe deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
