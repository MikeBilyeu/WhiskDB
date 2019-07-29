// // store regex to check validation
const titleRegEx = /^[A-Z0-9](( )?[a-zA-Z0-9()-\/]){2,55}$/;

// Alternative RegEx with no lookbehinds
const amountRegEx = /^\d{0,3}(\.(?=\d)\d{1,2})$|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?$|^\d{1,3} [1-9]\d?\/[1-9]\d?$|^\d{1,3}$/;

const ingredientNameRegEx = /^[A-Z0-9](( )?[a-zA-Z0-9-\/]){2,55}$/;
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

  // don't validate last ingredient, it should be empty but must be
  // at least 1 valid ingredient
  const numOfIngredients = ingredients.length - 1 || ingredients.length || 0;

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
    } else if (numOfIngredients < 2) {
      errors.ingredients[i] = {
        ...errors.ingredients[i],
        ingredient: `Click add button to add ingredient`
      };
    }
  }
  const noErrors =
    errors.ingredients.findIndex(obj => JSON.stringify(obj) !== "{}") < 0;

  if (noErrors) {
    delete errors.ingredients;
  }
}

function validateDirections(directions) {
  // set errors to an empty array beacuse directions input is a FieldArray
  errors.directions = [];
  const numOfDirections = directions.length || 0;
  for (let i = 0; i < numOfDirections; i++) {
    errors.directions.push({});

    if (!directions[i].step) {
      errors.directions[i] = {
        step: `step ${i + 1} must be 3 - 640 characters`
      };
    } else if (!/.{3,640}/.test(directions[i].step)) {
      errors.directions[i] = {
        step: `step ${i + 1} must be 3 - 640 characters`
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
    let numOfTrueValues = 0;
    //get the values of the sub-categories
    for (let subCategory in categories) {
      numOfTrueValues += Object.values(categories[subCategory]).filter(
        value => value
      ).length;
    }

    if (numOfTrueValues < 1) {
      errors.categories = {
        diet: { vegetarian: "categories must be 1 - 3 selected" }
      };
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
