const db = require("../../db");
const keys = require("../../config/keys");
const { convertTimeToMin } = require("../../utils");

module.exports = async ({ user, body: recipe }, res) => {
  // const errors = validateRecipeInput(recipe);
  // if (Object.keys(errors).length !== 0) {
  //   res.status(400).json(errors);
  // }
  // const ingredientsArr = recipe.ingredients
  //   .split(/\n/)
  //   .map(ing => {
  //     return ing.trim().replace(/[ \t]{2,}/, " ");
  //   })
  //   .filter(Boolean);
  //
  // const keywordsArr = recipe.keywords
  //   .toString()
  //   .split(",")
  //   .map(item => item.trim());

  try {
    const { rows } = await db.query(
      `INSERT INTO recipes
       VALUES (
          DEFAULT,
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          DEFAULT,
          NOW()
        )
         RETURNING recipe_id;`,
      [
        recipe.title,
        recipe.image_url,
        convertTimeToMin(recipe.time),
        recipe.yield,
        recipe.instructions,
        recipe.footnote
      ]
    );
    const recipe_id = rows[0].recipe_id;

    // let categoryValues = [];
    //
    // recipe.categories.forEach(category => {
    //   categoryValues.push(`(${recipe_id}, '${category}')`);
    // });
    //
    // await db.query(
    //   `INSERT INTO "RECIPES_CATEGORIES" VALUES ${categoryValues.join()};`
    // );

    // let keywordValues = [];
    //
    // keywordsArr.forEach(keyword => {
    //   keywordValues.push(`('${keyword}')`);
    // });
    //
    // await db.query(
    //   `INSERT INTO keywords (keyword) VALUES ${keywordValues.join()};`
    // );

    res.status(200).send({ recipe_id: recipe_id });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
