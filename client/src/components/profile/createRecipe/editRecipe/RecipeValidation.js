// validate on client side for better ux
export const Validate = formValues => {
  const errors = {};
  // store regex to check validation
  const titleRegEx = /^[A-Z]{1}((\s)?[a-zA-Z0-9\(\)])+$/;
  const amountRegEx = /^\d{0,3}(\.\d{1,2}|(?<=\d)\/\d{1,2}|(?<=\d) \d{0,2}((?<! )\/)(?<!\d)\d{1,2})?$/;
  const ingredientNameRegEx = /^[A-Z0-9][\w ]{2,255}$/;

  // Keep Recipe form inputs consistant w/ validation

  // Title validation
  if (!formValues.title) {
    errors.title = "Title field is required";
  } else if (!titleRegEx.test(formValues.title)) {
    errors.title = "Title is not valid";
  }
  // Time validation
  if (!formValues.time) {
    errors.time = {
      hours: "Time field is required",
      minutes: "Time field is required"
    };
  } else if (formValues.time.hours && isNaN(formValues.time.hours)) {
    errors.time = { hours: "Time field is required" };
  } else if (formValues.time.minutes && isNaN(formValues.time.minutes)) {
    errors.time = { minutes: "Time field is required" };
  }
  // Servings validation
  if (!formValues.servings) {
    errors.servings = "Servings field is required";
  } else if (isNaN(formValues.servings)) {
    errors.servings = "Servings is not valid";
  }

  // Making sure user enters two or more ingredients for the recipe
  if (formValues.ingredients && formValues.ingredients.length <= 1) {
    errors.ingredients = "Must add more ingredients";
  } else if (formValues.ingredients && formValues.ingredients.length > 1) {
    errors.ingredients = [];
    // Loop through ingredients array to validate each ingredient object
    for (let i = 0; i < formValues.ingredients.length; i++) {
      errors.ingredients.push({});
      // validate user enters an amount and ingredient name
      if (!formValues.ingredients[i].amount) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          amount: `Ingredient ${i +
            1} must contain an amount and ingredient name`
        };
      } else if (!amountRegEx.test(formValues.ingredients[i].amount)) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          amount: "Ingredient amount is not valid"
        };
      }
      if (!formValues.ingredients[i].ingredient) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          ingredient: `Ingredient ${i +
            1} must contain an amount and ingredient name`
        };
      } else if (
        !ingredientNameRegEx.test(formValues.ingredients[i].ingredient)
      ) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          ingredient: `Ingredient ${i + 1} ingredient name is not valid`
        };
      }
    }
  }

  if (formValues.directions && formValues.directions.length < 1) {
    errors.directions = "You must add at least one step for directions";
  } else if (formValues.directions && formValues.directions.length >= 1) {
    errors.directions = [];
    for (let i = 0; i < formValues.directions.length; i++) {
      errors.directions.push({});
      if (!formValues.directions[i].step) {
        errors.directions[i] = { step: "You must add a step to directions" };
      } else if (formValues.directions[i].step.length < 15) {
        errors.directions[i] = {
          ...errors.directions[i],
          step: `step ${i + 1} must be 15 - 150 characters`
        };
      } else if (formValues.directions[i] > 150) {
        errors.directions[i] = {
          ...errors.directions[i],
          step: `step ${i + 1} must be 15 - 150 characters`
        };
      }
    }
  }

  if (
    !formValues.categories ||
    Object.keys(formValues.categories).length === 0
  ) {
    errors.categories = "Select  1 - 3 from each category";
  } else if (Object.keys(formValues.categories).length < 3) {
    errors.categories = "Select 1 - 3 from each category";
  } else if (Object.keys(formValues.categories).length === 3) {
    // check that each category is in the categories object so we can iterate over that object

    for (let subCat in formValues.categories) {
      // checking that each subCategory contains 1 - 3 true values to validate Categories
      let allValues = Object.values(formValues.categories[subCat]);
      let allTrue = allValues.filter(x => x === true);
      if (allTrue.length < 1 || allTrue.length > 3) {
        errors.categories = "Select 1 - 3 from each category";
      }
    }
    // - keeping count of the number of true values
  }

  console.log(errors);
  return errors;
};
