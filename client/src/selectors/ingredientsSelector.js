import { createSelector } from "reselect";

const unitSelector = state => state.recipe.unit;
const ingredientListSelector = state => state.recipe.recipe.ingredients;
const convertedServingsSelector = state => state.recipe.convertedServings;
const servingsSelector = state => state.recipe.recipe.servings;

const metricIncrements = [
  237, // 1 cup
  177, // 3/4 cup
  158, // 2/3 cup
  118, // 1/2 cup
  79, // 1/3 cup
  59, // 1/4 cup
  45, // 3 Tbsp
  30, // 2 Tbsp
  15, // 1 Tbsp
  10, // 2 tsp
  7.5, // 1/2 Tbsp
  5, // 1 tsp
  2.5, // 1/2 tsp
  1.25, // 1/4 tsp
  0.63 // 1/8 tsp
];

const convertIngredients = (
  unit,
  servings,
  convertedServings,
  ingredientList
) => {
  const roundedMetricAmounts = ingredientList.map(ingredientObj => {
    // Adjust the amount if the servings is adjusted
    const amount = ingredientObj.amount * (convertedServings / servings);

    if (ingredientObj.unit === "milliliter") {
      let roundedAmount = amount <= 0.625 ? 0.63 : 0;
      let remainder = amount;
      // max and min threshold
      const threshold = amount * 0.06329 > 15 ? 15 : amount * 0.06329;

      while (remainder >= threshold) {
        if (remainder <= 0.625) {
          break;
        }

        // this rounds the amounts to nearest measuring utensil (US)
        // e.g. 239ml -> 237ml (1 cup US)
        for (let i = 0; i < metricIncrements.length; i++) {
          // end loop if the remainder is trivial
          if (remainder < threshold) {
            i = metricIncrements.length;
          } else if (remainder >= metricIncrements[i] - threshold) {
            // remove the largest increment from the remainder
            remainder -= metricIncrements[i];
            // add the largest increment to the rounded amount
            roundedAmount += metricIncrements[i];

            i = metricIncrements.length;
          }
        }
      }
      return { ...ingredientObj, amount: roundedAmount };
    } else if (ingredientObj.unit === "gram") {
      // round grams to nearest gram
      let roundedAmount = amount <= 1 ? 1 : Math.round(amount);
      return { ...ingredientObj, amount: roundedAmount };
    }
    // round amount to nearest 1/4 or 1/2
    let roundedAmount = Math.round(amount * 4) / 4;
    roundedAmount = roundedAmount < 0.25 ? 0.25 : roundedAmount;
    return {
      ...ingredientObj,
      amount: roundedAmount
    };
  });

  const USIngredientList = roundedMetricAmounts.map(ingredientObj => {
    const UsIncrements = [
      ["1", "cup"],
      ["3/4", "cup"],
      ["2/3", "cup"],
      ["1/2", "cup"],
      ["1/3", "cup"],
      ["1/4", "cup"],
      ["3", "Tbsp"],
      ["2", "Tbsp"],
      ["1", "Tbsp"],
      ["2", "tsp"],
      ["1/2", "Tbsp"],
      ["1", "tsp"],
      ["1/2", "tsp"],
      ["1/4", "tsp"],
      ["1/8", "tsp"]
    ];

    let remainder = ingredientObj.amount;
    let amounts = [];

    if (ingredientObj.unit === "milliliter") {
      while (remainder >= 0.63) {
        for (let i = 0; i < metricIncrements.length; i++) {
          if (remainder >= metricIncrements[i]) {
            if (remainder >= metricIncrements[0]) {
              amounts.push({
                amount: Math.floor(remainder / metricIncrements[0]),
                unit: UsIncrements[0][1]
              });
              remainder -=
                Math.floor(remainder / metricIncrements[0]) *
                metricIncrements[0];
            } else {
              remainder -= metricIncrements[i];
              amounts.push({
                amount: UsIncrements[i][0],
                unit: UsIncrements[i][1]
              });
            }
          } else if (remainder < 0.63) {
            break;
          }
        }
      }
      return { ...ingredientObj, amount: amounts };
    }
    if (ingredientObj.unit === "gram") {
      let pounds = Math.floor(ingredientObj.amount / 454);
      // sets the decimal precision depending on amount
      let fixedTo = ingredientObj.amount <= 1 ? 3 : 1;
      let ounces = ((ingredientObj.amount % 454) / 28.35).toFixed(fixedTo);

      if (pounds > 0) {
        amounts.push({
          amount: pounds,
          unit: "pound"
        });
      }
      if (ounces > 0.0) {
        amounts.push({
          amount: ounces,
          unit: "ounce"
        });
      }
      return { ...ingredientObj, amount: amounts };
    }
    return ingredientObj;
  });

  switch (unit) {
    case "Metric":
      return roundedMetricAmounts;
    case "US":
      return USIngredientList;
    default:
      return roundedMetricAmounts;
  }
};

export default createSelector(
  unitSelector,
  servingsSelector,
  convertedServingsSelector,
  ingredientListSelector,
  convertIngredients
);
