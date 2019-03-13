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

  return errors;
};
