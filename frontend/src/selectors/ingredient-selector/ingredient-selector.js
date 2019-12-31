import { createSelector } from "reselect";

import formatIngredientList from "./utils/formatIngredientList";
import getIngredientListUs from "./utils/getIngredientListUs";
import getIngredientListMetric from "./utils/getIngredientListMetric";

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
  // converts ingredients into a metric objects "amounts not rounded"
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
