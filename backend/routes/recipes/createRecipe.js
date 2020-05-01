const db = require("../../db");
const keys = require("../../config/keys");
const { convertTimeToMin } = require("../../utils");

module.exports = async ({ user, body: recipe }, res) => {
  // const errors = validateRecipeInput(recipe);
  // if (Object.keys(errors).length !== 0) {
  //   res.status(400).json(errors);
  // }
  const ingredientsArr = recipe.ingredients
    .split(/\n/)
    .map(ing => {
      return ing.trim().replace(/[ \t]{2,}/, " ");
    })
    .filter(Boolean);

  const keywordsArr = recipe.keywords
    .toString()
    .split(",")
    .map(item => item.trim());

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
          NULL,
          DEFAULT,
          (setweight(to_tsvector($3::VARCHAR), 'A')
            || setweight(to_tsvector($8::VARCHAR), 'C')
            || setweight(to_tsvector(
                 array_to_string($7::VARCHAR[], ' ')), 'B')),
          $7,
          $8,
          $9,
          $10
        )
         RETURNING recipe_id;`,
      [
        user.user_id,
        recipe.image_url,
        recipe.title.trim(),
        convertTimeToMin(recipe.time),
        recipe.servings,
        recipe.footnote,
        keywordsArr,
        recipe.directions,
        ingredientsArr,
        recipe.categories
      ]
    );
    const recipe_id = rows[0].recipe_id;
    let categoryValues = [];

    recipe.categories.forEach(category => {
      categoryValues.push(`(${recipe_id}, '${category}')`);
    });

    await db.query(
      `INSERT INTO recipes_join_categories VALUES ${categoryValues.join()};`
    );

    let keywordValues = [];

    keywordsArr.forEach(keyword => {
      keywordValues.push(`('${keyword}')`);
    });

    await db.query(
      `INSERT INTO keywords (keyword) VALUES ${keywordValues.join()};`
    );

    res.status(200).send({ recipe_id: recipe_id });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
