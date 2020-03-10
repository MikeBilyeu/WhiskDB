// Store regex to check validation
const titleRegEx = /^[A-Z0-9].{2,55}$/;

const ingredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]?\d?(( |-){0,2}[⅛¼⅓½⅔¾])|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3}( |-)[1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) ([\w (),\-!#$%&*+\.]*){3,90}?$/i;

let errors = {};

const validateTitle = title => {
  if (!title) {
    errors.title = "Add a recipe title";
  } else if (!titleRegEx.test(title)) {
    // The field parse doesn't prevent invalid title, must check title here
    errors.title = "Title is not valid";
  }
};

const validateImage = (imageFile, image) => {
  if (!image && !imageFile) {
    errors.image_url = "Add an image for the recipe";
  }
};

const validateServings = servings => {
  if (!servings) {
    errors.servings = "Add a yield for the recipe";
  }
};

const validateIngredients = ingredients => {
  // set errors to an empty array beacuse ingredients input is a FieldArray

  errors.ingredients = [];
  let ingredientList = ingredients ? ingredients.split("\n") : [];

  // check if ingredietns array is empty
  if (!ingredientList.length) {
    errors.ingredients.push("Add at least one ingredient");
  } else {
    for (let i = 0; i < ingredientList.length; i++) {
      errors.ingredients.push(null);

      if (!ingredientRegEx.test(ingredientList[i])) {
        errors.ingredients[i] = `Ingredient on line ${i +
          1} is not in a valid format: must have an amount(number) and the ingredient. `;
      }
    }
  }

  const noErrors =
    // check if array contains !null vlaue
    errors.ingredients.findIndex(str => str !== null) === -1;

  if (noErrors) {
    delete errors.ingredients;
  }
};

const validateTime = time => {
  if (!time || (!time.hours && !time.minutes)) {
    errors.time = {
      hours: "Add a time for the recipe",
      minutes: "Time field is required"
    };
  }
};

const validateDirections = directions => {
  if (!directions) {
    errors.directions = "Add instructions for the recipe";
  }
};

const validateKeywords = keywords => {
  if (!keywords) {
    errors.keywords = "Inlcude at least one keyword";
  }
};

const validateCategories = categories => {
  if (categories && categories.length < 1) {
    errors.categories = "Select at least one category";
  } else if (categories && categories.length > 4) {
    errors.categories = "Too many categories selected";
  }
};

export const validate = values => {
  errors = {};
  if (Object.keys(values).length) {
    validateTitle(values.title);
    validateImage(values.imageFile, values.image_url);
    validateServings(values.servings);
    validateIngredients(values.ingredients);
    validateTime(values.time);
    validateDirections(values.directions);
    validateKeywords(values.keywords);
    validateCategories(values.categories);
  }

  return errors;
};
