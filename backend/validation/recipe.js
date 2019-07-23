module.exports = function validateRecipeInput(data) {
  let errors = {};
  // store regex to check validation
  const titleRegEx = /^[A-Z0-9](( )?[a-zA-Z0-9()-\/]){2,55}$/;
  const amountRegEx = /^\d{0,3}(\.(?=\d)\d{1,2})$|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?$|^\d{1,3} [1-9]\d?\/[1-9]\d?$|^\d{1,3}$/;
  const ingredientNameRegEx = /^[A-Z0-9](( )?[a-zA-Z0-9-\/]){2,55}$/;

  // Keep Recipe form inputs consistant w/ validation

  // Title validation
  if (!data.title) {
    errors.title = "Title field is required";
  }
  //  else if (!titleRegEx.test(data.title)) {
  //   errors.title = "Title is not valid";
  // }
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
  if (data.ingredients && data.ingredients.length < 1) {
    errors.ingredients = "Must add more ingredients";
  } else if (data.ingredients) {
    // Loop through ingredients array to validate each ingredient object
    for (let i = 0; i < data.ingredients.length; i++) {
      // validate user enters an amount and ingredient name
      if (!data.ingredients[i].amount && !data.ingredients[i].ingredient) {
        errors.ingredients =
          "Ingredients must contain an amount and ingredient name";
      } else if (!amountRegEx.test(data.ingredients[i].amount)) {
        errors.ingredients = "Ingredient amount is not valid";
      }
      // else if (!ingredientNameRegEx.test(data.ingredients[i].ingredient)) {
      //   errors.ingredients = "Ingredient name is not valid";
      // }
    }
  }

  // Making sure user enters directions
  if (data.directions && data.directions.length === 0) {
    errors.directions = "Directions are required";
  } else if (data.directions) {
    // Loop through directions array to validate each direction object
    for (let i = 0; i < data.directions.length; i++) {
      if (!data.directions[i].step) {
        errors.directions = `Directions are required`;
      } else if (
        data.directions[i].step.length < 3 ||
        data.directions[i].step.length > 640
      ) {
        errors.directions = "Directions must be 3 - 640 characters";
      }
    }
  }

  // Make sure user enters valid footnote
  // if (
  //   data.footnote &&
  //   (data.footnote.length <= 3 || data.footnote.length > 455)
  // ) {
  //   errors.footnote = "Footnote must be 3 - 255 characters";
  // }

  return errors;
};
