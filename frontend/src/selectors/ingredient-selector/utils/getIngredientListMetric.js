import increments from "./increments";

const { metricIncrements } = increments;

const getIngredientListMetric = (
  ingredientList,
  servings,
  convertedServings
) => {
  const metricIngredients = ingredientList.map(ingredientObj => {
    // Adjust the amount if the servings is adjusted
    const amount = ingredientObj.amount * (convertedServings / servings);

    if (ingredientObj.unit === "ml") {
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
  return metricIngredients;
};

export default getIngredientListMetric;
