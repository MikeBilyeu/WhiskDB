// // store regex to check validation
const titleRegEx = /^[A-Z]{1}((\s)?[a-zA-Z0-9])+/;
const amountRegEx = /^\d{0,3}(\.\d{1,2}|(?<=\d)\/\d{1,2}|(?<=\d) \d{0,2}((?<! )\/)(?<!\d)\d{1,2})?$/;
const ingredientNameRegEx = /^[A-Z0-9][\w ]{2,255}$/;
let errors = {};

function validateTitle(title) {
  if (!title) {
    return (errors.title = "Title field is required");
  } else if (!titleRegEx.test(title)) {
    // The field parse doesn't prevent invalid title, must check title here
    return (errors.title = "Title is not valid");
  }
}

function validateTime(time) {
  if (!time) {
    errors.time = {
      hours: "Time field is required",
      minutes: "Time field is required"
    };
  }
}

function validateServings(servings) {
  if (!servings) {
    errors.servings = "Servings field is required";
  }
}

function validateIngredients(ingredients) {
  // set errors to an empty array beacuse ingredients input is a FieldArray
  errors.ingredients = [];

  const numOfIngredients = ingredients.length || 0;

  for (let i = 0; i < numOfIngredients; i++) {
    errors.ingredients.push({});
    // validate user enters an amount and ingredient name for each ingredient
    if (!ingredients[i].amount) {
      errors.ingredients[i] = {
        amount: `Ingredient ${i + 1} must contain an amount`
      };
    } else if (!amountRegEx.test(ingredients[i].amount)) {
      errors.ingredients[i] = {
        amount: "Ingredient amount is not valid"
      };
    }
    if (!ingredients[i].ingredient) {
      errors.ingredients[i] = {
        ...errors.ingredients[i],
        ingredient: `Ingredient ${i + 1} must contain an ingredient name`
      };
    } else if (!ingredientNameRegEx.test(ingredients[i].ingredient)) {
      errors.ingredients[i] = {
        ...errors.ingredients[i],
        ingredient: `Ingredient ${i + 1} ingredient name is not valid`
      };
    }
  }
}

function validateDirections(directions) {
  // set errors to an empty array beacuse directions input is a FieldArray
  errors.directions = [];
  const numOfDirections = directions.length || 0;
  for (let i = 0; i < numOfDirections; i++) {
    errors.directions.push({});
    if (!/.{15,200}/.test(directions[i].step)) {
      errors.directions[i] = {
        step: `step ${i + 1} must be 15 - 200 characters`
      };
    }
  }

  const noErrors =
    errors.directions.findIndex(obj => JSON.stringify(obj) !== "{}") < 0;

  if (noErrors) {
    delete errors.directions;
  }
}

function validateCategories(categories) {
  if (categories) {
    //get the values of the sub-categories
    for (let subCategory in categories) {
      let numOfTrueValues = Object.values(categories[subCategory]).filter(
        value => value
      ).length;
      if (numOfTrueValues < 1 || numOfTrueValues > 3) {
        errors.categories = {
          diet: { vegetarian: "categories must be 1 - 3 selected" }
        };
      }
    }
  }
}

export const ValidateTitle = ({ title }) => {
  errors = {};
  validateTitle(title);
  return errors;
};

export const ValidateTimeServingsFootnote = ({ time, servings }) => {
  errors = {};
  validateTime(time);
  validateServings(servings);
  return errors;
};

export const ValidateIngredients = ({ ingredients }) => {
  errors = {};
  validateIngredients(ingredients);
  return errors;
};

export const ValidateDirections = ({ directions }) => {
  errors = {};
  validateDirections(directions);
  return errors;
};

export const ValidateCategories = ({ categories }) => {
  errors = {};
  validateCategories(categories);
  return errors;
};
