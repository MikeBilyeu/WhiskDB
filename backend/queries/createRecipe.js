const pool = require("../utils/connectPool");

// Load input validation
// const validateRecipeInput = require("../utils/validation/recipe");

const createRecipe = async (request, response) => {
  const {
    time,
    servings,
    ingredients,
    directions,
    footnote,
    categories,
    keywords,
    image_url
  } = request.body;
  const { user_id: created_by } = request.user;
  const title = request.body.title.trim();

  // Form validation
  // const errors = validateRecipeInput(request.body);
  // // Check validation
  // if (Object.keys(errors).length !== 0) {
  //   response.status(400).json(errors);
  // }

  const timeHours = time.hours > 0 ? time.hours : 0;
  const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
  const total_time_mins = timeHours * 60 + timeMinutes;

  try {
    const client = await pool.connect();
    const res = await client.query(
      `INSERT INTO recipes( created_by, title, servings, total_time_mins,
        footnote, directions, ingredients, keywords, categories, image_url,
        document_vectors ) VALUES ( $1, CAST($2 AS VARCHAR), $3, $4, $5, $6,
        $7, CAST($8 AS VARCHAR[]), $9, $10, ( to_tsvector($2) || to_tsvector(
        array_to_string($8, ' ') ) ) ) RETURNING recipe_id`,
      [
        created_by,
        title,
        servings,
        total_time_mins,
        footnote,
        directions,
        ingredients,
        keywords,
        categories,
        image_url
      ]
    );

    const recipe_id = res.rows[0].recipe_id;

    categories.forEach(category => {
      client.query(
        `INSERT INTO recipes_join_categories (recipe, category)
         VALUES ($1, (SELECT category_id FROM categories
         WHERE category_name = $2))`,
        [recipe_id, category]
      );
    });
    client.release();
    response.status(200).send({ recipe_id: recipe_id });
  } catch (err) {
    response.status(400).json(err);
  }
};

module.exports = {
  createRecipe
};
