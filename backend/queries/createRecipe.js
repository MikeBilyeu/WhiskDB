const Pool = require("pg").Pool;
const keys = require("../config/keys");
// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

// Load input validation
const validateRecipeInput = require("../validation/recipe");

//convert ingredient amount from us to metric
const formatIngredientList = ingredients => {
  // create a formated list
  let formatedList = ingredients.map(ingredient => {
    let { amount, unit } = ingredient;
    // using eval to get the decimal of mixed fractions
    let decimalAmount = eval(amount.split(" ").join("+"));
    // may have to round decimal to nearest 1000th
    let metricUnit = unit;

    switch (unit) {
      case "cup":
        decimalAmount *= 237;
        metricUnit = "milliliter";
        break;
      case "tablespoon":
        decimalAmount *= 15;
        metricUnit = "milliliter";
        break;
      case "teaspoon":
        decimalAmount *= 5;
        metricUnit = "milliliter";
        break;
      case "ounce":
        decimalAmount *= 28;
        metricUnit = "gram";
        break;
      case "pound":
        decimalAmount *= 454;
        metricUnit = "gram";
      default:
        break;
    }

    ingredient.amount = decimalAmount.toString();
    if (unit) {
      ingredient.unit = metricUnit;
    }
    return ingredient;
  });
  return formatedList;
};

const createRecipe = (request, response) => {
  const {
    title,
    time,
    servings,
    ingredients,
    directions,
    footnote,
    privateRecipe,
    created_by,
    categories
  } = request.body;

  // Form validation
  const errors = validateRecipeInput(request.body);
  // Check validation
  if (Object.keys(errors).length !== 0) {
    return response.status(400).json(errors);
  }

  const timeHours = time.hours > 0 ? time.hours : 0;
  const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
  const total_time_mins = timeHours * 60 + timeMinutes;

  let metricIngredients = formatIngredientList(ingredients);

  pool.connect().then(client => {
    let recipe_id = null;
    return client
      .query(
        "INSERT INTO recipes (created_by, title, servings, total_time_mins, footnote, private, directions, ingredients) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING recipe_id",
        [
          created_by,
          title,
          servings,
          total_time_mins,
          footnote,
          privateRecipe,
          directions,
          metricIngredients
        ]
      )
      .then(res => {
        recipe_id = res.rows[0].recipe_id;
        // loop through the ingredients
        for (let i = 0; i < ingredients.length; i++) {
          let { ingredient } = ingredients[i];
          /* check if ingredients table already contains the ingredient*/
          client
            .query("SELECT * FROM ingredients WHERE ingredient_name = $1", [
              ingredient
            ])
            .then(res => {
              // ingredients table already containes that ingredient_name
              if (res.rowCount > 0) {
                client.query(
                  "INSERT INTO recipes_join_ingredients (recipe, ingredient) VALUES ($1, $2)",
                  [recipe_id, res.rows[0].ingredient_id]
                );
              } else {
                // ingredients table does not contain the ingredient
                client
                  .query(
                    "INSERT INTO ingredients (ingredient_name) VALUES ($1) RETURNING ingredient_id",
                    [ingredient]
                  )
                  .then(res => {
                    client.query(
                      "INSERT INTO recipes_join_ingredients (recipe, ingredient) VALUES ($1, $2)",
                      [recipe_id, res.rows[0].ingredient_id]
                    );
                  });
              }
            })
            .catch(e => {
              client.release();
              console.log(e);
            });
        }
        //end of for loop
      })
      .then(() => {
        // loop through the keys of the category object
        for (let i = 0, keys = Object.keys(categories); i < keys.length; i++) {
          // loop through sub categories
          for (
            let j = 0, subKeys = Object.keys(categories[keys[i]]);
            j < subKeys.length;
            j++
          ) {
            if (categories[keys[i]][subKeys[j]] === true) {
              client
                .query(
                  "SELECT category_id FROM categories WHERE category_name = $1",
                  [subKeys[j]]
                )
                .then(res => {
                  client.query(
                    "INSERT INTO recipes_join_categories (recipe, category) VALUES ($1, $2)",
                    [recipe_id, res.rows[0].category_id]
                  );
                });
            }
          }
        }
      })
      .then(() => {
        return response.status(200).send({ recipe_id: recipe_id });
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  createRecipe
};
