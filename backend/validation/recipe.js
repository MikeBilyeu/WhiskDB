module.exports = function validateRecipeInput(data) {
  let errors = {};
  // store regex to check validation
  const titleRegEx = /^[A-Z0-9]([a-zA-Z0-9()-/ ]){2,75}$/;

  const ingredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3}( |-)[1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) (. *){3,90}?$/i;
  // old const ingredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) ([a-z\d-,\/+.%&*!] *){3,40}( \( *([a-z\d-,\/+.%&*!] *){1,40}\) *)?$/i;

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

  // Making sure user enters one or more ingredients for the recipe
  if (!data.ingredients) {
    errors.ingredients = "Add an ingredient";
  } else {
    // Loop through ingredients array to validate each ingredient
    const numOfIngredients = data.ingredients.length;
    for (let i = 0; i < numOfIngredients; i++) {
      // validate user enters an amount and ingredient name
      if (!ingredientRegEx.test(data.ingredients[i])) {
        errors.ingredients = "Ingredient amount is not valid";
      }
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
