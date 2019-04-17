import { createSelector } from "reselect";

const unitSelector = state => state.recipe.unit;
const ingredientListSelector = state => state.recipe.recipe.ingredients;

const convertIngredients = (unit, ingredientList) => {
  // ingredient conversions go here
  switch (unit) {
    case "Metric":
      return ingredientList;
    case "US":
      return [{ amount: "1", unit: "cup", ingredient: "Water" }];
    default:
      return ingredientList;
  }
};

export default createSelector(
  unitSelector,
  ingredientListSelector,
  convertIngredients
);
