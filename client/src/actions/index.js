// Add Ingredient
export const addIngredient = () => {
  //action
  return {
    type: "ADD_INGREDIENT",
    payload: 1
  };
};

export const subtractIngredient = () => {
  //action
  return {
    type: "SUBTRACT_INGREDIENT",
    payload: 1
  };
};
