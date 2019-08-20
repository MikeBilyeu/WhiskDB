// // store regex to check validation
const titleRegEx = /^[A-Z0-9]([a-zA-Z0-9()-\/ ]){2,55}$/;

// Alternative RegEx with no lookbehinds
const amountRegEx = /^\d{0,3}(\.(?=\d)\d{1,2})$|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?$|^\d{1,3} [1-9]\d?\/[1-9]\d?$|^\d{1,3}$/;

const ingredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) ([a-z\d-,\/+.%&*!] *){3,40}( \( *([a-z\d-,\/+.%&*!] *){1,40}\) *)?$/i;

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
  // check if ingredietns array is empty
  if (!ingredients.length) {
    errors.ingredients.push("Add at least one ingredient");
  } else {
    for (let i = 0; i < ingredients.length; i++) {
      errors.ingredients.push(null);

      if (!ingredientRegEx.test(ingredients[i])) {
        errors.ingredients[i] =
          "Ingredient is not in a valid format: Amount Unit Ingredient (prep)";
      }
    }
  }

  const noErrors =
    // check if array contains !null vlaue
    errors.ingredients.findIndex(str => str !== null) === -1;

  if (noErrors) {
    delete errors.ingredients;
  }
}

function validateDirections(directions) {
  // set errors to an empty array beacuse directions input is a FieldArray
  errors.directions = [];
  if (!directions.length) {
    errors.directions.push("Add at least one ingredient");
  } else {
    for (let i = 0; i < directions.length; i++) {
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
  }

  const noErrors =
    // find index of !empty object or not found return -1 check if -1
    errors.directions.findIndex(obj => JSON.stringify(obj) !== "{}") === -1;

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

function validateKeywords(keywords) {
  // set errors to an empty array beacuse ingredients input is a FieldArray
  errors.keywords = [];
  // check if ingredietns array is empty
  if (!keywords.length) {
    errors.keywords.push("Add at least one keyword");
  } else if (keywords.length > 10) {
    errors.keywords.push("Only inlcude 1 - 10 keywords");
  } else {
    for (let i = 0; i < keywords.length; i++) {
      errors.keywords.push(null);

      if (!/.{3,25}/.test(keywords[i])) {
        errors.keywords[i] = "Keyword is not valid: must be 3 - 25 characters";
      }
    }
  }

  const noErrors =
    // check if array contains !null vlaue
    errors.keywords.findIndex(str => str !== null) === -1;

  if (noErrors) {
    delete errors.keywords;
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

export const ValidateKeywords = ({ keywords }) => {
  errors = {};
  validateKeywords(keywords);
  return errors;
};
