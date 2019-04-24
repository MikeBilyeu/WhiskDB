import { createSelector } from "reselect";

const unitSelector = state => state.recipe.unit;
const ingredientListSelector = state => state.recipe.recipe.ingredients;

const convertIngredients = (unit, ingredientList) => {
  const roundedMetricAmounts = ingredientList.map(ingredientObj => {
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

    const amount = ingredientObj.amount;

    if (ingredientObj.unit === "milliliter") {
      let roundedAmount = amount <= 0.625 ? 0.63 : 0;
      let remainder = amount;
      // max and min threshold
      // fix this
      const threshold = amount * 0.06329 > 15 ? 15 : amount * 0.06329;

      while (remainder >= threshold) {
        if (remainder <= 0.625) {
          break;
        }
        //for loop to loop the measuringIncrements
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

    return ingredientObj;
  });
  console.log("Rounded Amounts", roundedMetricAmounts);
  console.log("Original Amounts", ingredientList);
  switch (unit) {
    case "Metric":
      return roundedMetricAmounts;
    case "US":
      return [{ amount: "1", unit: "cup", ingredient: "Exmaple" }];
    default:
      return roundedMetricAmounts;
  }
};

export default createSelector(
  unitSelector,
  ingredientListSelector,
  convertIngredients
);
