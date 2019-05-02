import { createSelector } from "reselect";

const unitSelector = state => state.recipe.unit;
const ingredientListSelector = state => state.recipe.recipe.ingredients;
const convertedServingsSelector = state => state.recipe.convertedServings;
const servingsSelector = state => state.recipe.recipe.servings;

const measuringIncrements = [
  237,
  177,
  158,
  118,
  79,
  59,
  45,
  30,
  15,
  10,
  5,
  2.5,
  1.25,
  0.63
];

const convertIngredients = (
  unit,
  servings,
  convertedServings,
  ingredientList
) => {
  const roundedMetricAmounts = ingredientList.map(ingredientObj => {
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

        for (let i = 0; i < measuringIncrements.length; i++) {
          if (remainder < threshold) {
            i = measuringIncrements.length;
          } else if (remainder >= measuringIncrements[i] - threshold) {
            remainder -= measuringIncrements[i];

            roundedAmount += measuringIncrements[i];

            i = measuringIncrements.length;
          }
        }
      }
      return { ...ingredientObj, amount: roundedAmount };
    } else if (ingredientObj.unit === "gram") {
      let roundedAmount =
        amount <= 0.4 ? Math.ceil(amount) : Math.round(amount);
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
    const USMeasuringIncrements = [
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
      ["1", "tsp"],
      ["1/2", "tsp"],
      ["1/4", "tsp"],
      ["1/8", "tsp"]
    ];

    let remainder = ingredientObj.amount;
    let amounts = [];

    if (ingredientObj.unit === "milliliter") {
      while (remainder >= 0.63) {
        for (let i = 0; i < measuringIncrements.length; i++) {
          if (remainder >= measuringIncrements[i]) {
            if (remainder >= measuringIncrements[0]) {
              amounts.push({
                amount: Math.floor(remainder / measuringIncrements[0]),
                unit: USMeasuringIncrements[0][1]
              });
              remainder -=
                Math.floor(remainder / measuringIncrements[0]) *
                measuringIncrements[0];
            } else {
              remainder -= measuringIncrements[i];
              amounts.push({
                amount: USMeasuringIncrements[i][0],
                unit: USMeasuringIncrements[i][1]
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
      let ounces = ((ingredientObj.amount % 454) / 28.35).toFixed(1);
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
