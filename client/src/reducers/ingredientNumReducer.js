//Number of Ingredients
export const ingredientNumReducer = (numOfIngredients = 2, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return numOfIngredients + action.payload;
    case "SUBTRACT_INGREDIENT":
      return numOfIngredients - action.payload;
    default:
      return numOfIngredients;
  }
};
