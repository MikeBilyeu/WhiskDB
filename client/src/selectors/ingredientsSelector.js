import { createSelector } from "reselect";

const unitSelector = state => state.recipe.unit;
const ingredientListSelector = state => state.recipe.recipe.ingredients;

const convertIngredients = (unit, ingredientList) => {
  // ingredient conversions go here
  // Rounding Function
  // const roundMetricAmounts = ingredientList.map(ingredientObj => {
  //   const { amount, unit } = ingredientObj;
  //   if (unit === 'milliliters') {
  //     if(amount)
  //
  //   } else {
  //     return ingredientObj
  //   }
  // });
  // all ingredients get rounded
  //  if original Unit === milliliters or liters
  // round to nearest 15ml if amount >= 79ml
  // round to nearest 5ml if amount < 79ml and amount >= 52ml
  // round to nearest 2.5ml if amount < 52ml and amount > 5ml
  // round to nearest 0.63ml if amount <= 5ml and amount >= .47ml
  // round to pinch if amount < .47ml

  //loop array of ml increments 237,177,158,118,79,59

  // let ml = amount/

  //map
  const roundedIngredientList = ingredientList.map(ingredientObj => {
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
      5,
      2.5,
      1.25,
      0.63,
      0.3125
    ];

    const amount = ingredientObj.amount;
    let roundedAmount = 0;
    let remainder = amount;
    const threshold = amount * 0.06329;

    if (ingredientObj.unit === "milliliter") {
      while (remainder >= threshold) {
        //for loop to loop the measuringIncrements
        for (let milliliters of measuringIncrements) {
          if (remainder < threshold) {
            milliliters = measuringIncrements.length;
          } else if (remainder >= milliliters - threshold) {
            remainder -= milliliters;
            roundedAmount += milliliters;
          }
          milliliters++;
        }
      }
      return { ...ingredientObj, amount: roundedAmount };
    }
    return ingredientObj;
  });
  console.log("Rounded Amounts", roundedIngredientList);
  console.log("Original Amounts", ingredientList);
  switch (unit) {
    case "Metric":
      return roundedIngredientList;
    case "US":
      return [{ amount: "1", unit: "cup", ingredient: "Exmaple" }];
    default:
      return roundedIngredientList;
  }
};

export default createSelector(
  unitSelector,
  ingredientListSelector,
  convertIngredients
);
