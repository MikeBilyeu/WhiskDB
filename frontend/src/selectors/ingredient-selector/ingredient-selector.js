import { createSelector } from "reselect";
import formatIngredientList from "./formatIngredientList";

import getIngredientListUs from "./getIngredientListUs";
import getIngredientListMetric from "./getIngredientListMetric";

const unitSelector = state => state.recipe.unit;
const ingredientListSelector = state => state.recipe.recipe.ingredients;
const convertedServingsSelector = state => state.recipe.convertedServings;
const servingsSelector = state => state.recipe.recipe.servings;

const convertIngredients = (
  unit,
  servings,
  convertedServings,
  ingredientList
) => {
  // converts whatever format ingredients are into a metric format
  ingredientList = formatIngredientList(ingredientList);

  const metricIngredientList = getIngredientListMetric(
    ingredientList,
    servings,
    convertedServings
  );

  const usIngredientList = getIngredientListUs(metricIngredientList);

  switch (unit) {
    case "Metric":
      return metricIngredientList;
    case "US":
      return usIngredientList;
    default:
      return metricIngredientList;
  }
};

export default createSelector(
  unitSelector,
  servingsSelector,
  convertedServingsSelector,
  ingredientListSelector,
  convertIngredients
);
