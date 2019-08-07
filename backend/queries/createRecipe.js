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

const amountRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2})/;
const unitsRegex = /^\b(cup(s?)|c|cp|tablespoon(s?)|tb(sp|s|l|ls)?|teaspoon(s?)|tsp|ts|t|lit(er|re)(s?)|l|millilit(er|re)(s?)|ml|ounce(s?)|oz|pound(s?)|lb(s?)|kilogram(s?)|kg(s?)|gram(s?)|g(s?))\b/i;
// getting the unit from the string
const cupRegEx = /\b(cup(s?)|c|cp)\b/i;

const tablespoonRegEx = /\b(tablespoon(s?)|tb(sp|s|l|ls)?)\b/i;
//create a regex for capital T for tablespoon js regex doesn't allow partial case insensitivity
const TRegEx = /\bT\b/;

const teaspoonRegEx = /\b(teaspoon(s?)|tsp|ts)\b/i;
//create a regex for lowercase t for teaspoon js regex doesn't allow partial case insensitivity
const tRegEx = /\bt\b/;

const literRegEx = /\b(lit(er|re)(s?)|l)\b/i;

const milliliterRegEx = /\b(millilit(er|re)(s?)|ml)\b/i;

const ounceRegEx = /\b(ounce(s?)|oz)\b/i;

const poundRegEx = /\b(pound(s?)|lb(s?))\b/i;

const kilogramRegEx = /\b(kilogram(s?)|kg(s?))\b/i;

const gramRegEx = /\b(gram(s?)|g(s?))\b/i;

//convert ingredient amount from us to metric
const formatIngredientList = ingredients => {
  //map over the ingredietns array
  // create a formated list
  let formatedList = ingredients.map(ingredient => {
    //remove Extra white space
    // match the amount from the ingredient with regex
    let ingredientStr = ingredient.replace(/\s+/g, " ").trim();

    let amount = amountRegEx.exec(ingredientStr)[0];
    ingredientStr = ingredientStr.replace(amountRegEx, "").trim();
    // pull off unit
    let unit = unitsRegex.test(ingredientStr)
      ? unitsRegex.exec(ingredientStr)[0]
      : "";
    ingredientStr = ingredientStr.replace(unitsRegex, "").trim();
    // this can get fixed to prevent matching ending spaces
    let ingredientName = /^[^\((\)]*/.exec(ingredientStr)[0].trim();
    ingredientStr = ingredientStr.replace(/^[^\((\)]*/, "").trim();

    let prep = ingredientStr.replace(/[{()}]/g, "") || "";

    // // using eval to get the decimal of mixed fractions
    let decimalAmount = eval(amount.split(" ").join("+"));
    // may have to round decimal to nearest 1000th

    let metricUnit = unit;

    if (unit) {
      switch (true) {
        case cupRegEx.test(unit):
          decimalAmount *= 237;
          metricUnit = "milliliter";
          break;
        case tablespoonRegEx.test(unit):
        case TRegEx.test(unit):
          decimalAmount *= 15;
          metricUnit = "milliliter";
          break;
        case teaspoonRegEx.test(unit):
        case TRegEx.test(unit):
          decimalAmount *= 5;
          metricUnit = "milliliter";
          break;
        case literRegEx.test(unit):
          decimalAmount *= 1000;
          metricUnit = "milliliter";
          break;
        case ounceRegEx.test(unit):
          decimalAmount *= 28;
          metricUnit = "gram";
          break;
        case poundRegEx.test(unit):
          decimalAmount *= 454;
          metricUnit = "gram";
          break;
        case kilogramRegEx.test(unit):
          decimalAmount *= 1000;
          metricUnit = "gram";
          break;
        default:
          break;
      }
      unit = metricUnit;
    }

    amount = decimalAmount.toString();

    return {
      amount: amount,
      unit: unit,
      ingredient: ingredientName,
      prep: prep
    };
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
  console.log(metricIngredients);
  console.log(
    "input",
    created_by,
    title,
    servings,
    total_time_mins,
    footnote,
    privateRecipe,
    directions,
    metricIngredients
  );

  pool.connect().then(client => {
    let recipe_id = null;
    return (
      client
        .query(
          "INSERT INTO recipes (created_by, title, servings, total_time_mins, footnote, private, directions, ingredients, document_vectors) VALUES ($1, CAST($2 AS VARCHAR), $3, $4, $5, $6, $7, $8, to_tsvector($2)) RETURNING recipe_id",
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
        // .then(res => {
        //   recipe_id = res.rows[0].recipe_id;
        //   // loop through the ingredients
        //   for (let i = 0; i < ingredients.length; i++) {
        //     let { ingredient } = ingredients[i];
        //     /* check if ingredients table already contains the ingredient*/
        //     client
        //       .query("SELECT * FROM ingredients WHERE ingredient_name = $1", [
        //         ingredient
        //       ])
        //       .then(res => {
        //         // ingredients table already containes that ingredient_name
        //         if (res.rowCount > 0) {
        //           client.query(
        //             "INSERT INTO recipes_join_ingredients (recipe, ingredient) VALUES ($1, $2)",
        //             [recipe_id, res.rows[0].ingredient_id]
        //           );
        //         } else {
        //           // ingredients table does not contain the ingredient
        //           client
        //             .query(
        //               "INSERT INTO ingredients (ingredient_name) VALUES ($1) RETURNING ingredient_id",
        //               [ingredient]
        //             )
        //             .then(res => {
        //               client.query(
        //                 "INSERT INTO recipes_join_ingredients (recipe, ingredient) VALUES ($1, $2)",
        //                 [recipe_id, res.rows[0].ingredient_id]
        //               );
        //             });
        //         }
        //       })
        //       .catch(e => {
        //         client.release();
        //         console.log(e);
        //       });
        //   }
        //   //end of for loop
        // })
        .then(res => {
          recipe_id = res.rows[0].recipe_id;
          // loop through the keys of the category object
          for (
            let i = 0, keys = Object.keys(categories);
            i < keys.length;
            i++
          ) {
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
        })
    );
  });
};

module.exports = {
  createRecipe
};
