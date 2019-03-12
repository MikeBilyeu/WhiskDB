module.exports = function validateRecipeInput(data) {
  let errors = {};
  // store regex to check validation
  const titleRegEx = /^[A-Z]{1}((\s)?[a-zA-Z0-9\(\)])+$/;
  const amountRegEx = /^\d{0,3}(\.\d{1,2}|(?<=\d)\/\d{1,2}|(?<=\d) \d{0,2}((?<! )\/)(?<!\d)\d{1,2})?$/;
  const ingredientNameRegEx = /^[A-Z0-9][\w ]{2,255}$/;

  // Keep Recipe form inputs consistant w/ validation

  // Title validation
  if (!data.title) {
    errors.title = "Title field is required";
  } else if (!titleRegEx.test(data.title)) {
    errors.title = "Title is not valid";
  }
  // Time validation
  if (!data.time) {
    errors.time = "Time field is required";
  } else if (data.time.hours && isNaN(data.time.hours)) {
    errors.time = "Hour time is not valid";
  } else if (data.time.minutes && isNaN(data.time.minutes)) {
    errors.time = "Minute time is not valid";
  }
  // Servings validation
  if (!data.servings) {
    errors.servings = "Servings field is required";
  } else if (isNaN(data.servings)) {
    errors.servings = "Servings is not valid";
  }

  // Making sure user enters two or more ingredients for the recipe
  if (Object.keys(data.ingredients).length <= 1) {
    errors.ingredients = "Must add more ingredients";
  } else {
    // Loop through ingredients object to validate each ingredient object
    for (let i = 0; i < data.ingredients.length; i++) {
      // validate user enters an amount and ingredient name
      if (!data.ingredients[i].amount && !data.ingredients[i].ingredient) {
        errors.ingredients =
          "Ingredients must contain an amount and ingredient name";
      } else if (!amountRegEx.test(data.ingredients[i].amount)) {
        errors.ingredients = "Ingredient amount is not valid";
      } else if (!ingredientNameRegEx.test(data.ingredients[i].ingredient)) {
        errors.ingredients = "Ingredient name is not valid";
      }
    }
  }

  // Making sure user enters directions
  if (Object.keys(data.directions).length === 0) {
    errors.directions = "Directions are required";
  } else {
    for (let i = 0; i < data.directions.length; i++) {
      if (data.directions[i].step.length < 5) {
        errors.directions = `Directions in step ${i + 1} are too short`;
      } else if (data.directions[i].step.length > 150) {
        errors.directions = `Directions is step ${i + 1} are too long`;
      }
    }
  }

  // Make sure user enters valid footnote
  if (data.footnote.length <= 3) {
    errors.footnote = "Footnote text length is too short";
  } else if (data.footnote.length > 255) {
    errors.Footnote = "Footnote text length is too long";
  }

  return errors;
};
