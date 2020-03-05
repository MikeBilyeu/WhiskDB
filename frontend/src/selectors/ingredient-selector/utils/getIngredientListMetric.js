import increments from "./increments";

const { metricIncrements } = increments;

const getIngredientListMetric = (
  ingredientList,
  servings,
  convertedServings
) => {
  const metricIngredients = ingredientList.map(
    ({ amount, unit, ingredient }) => {
      // Adjust the amount if the servings is adjusted
      const amountAdjusted = amount * (convertedServings / servings);

      const unitType =
        unit === "ml" ? "volume" : unit === "g" ? "mass" : undefined;

      if (unitType === "volume") {
        let roundedAmount = amountAdjusted <= 0.63 ? 0.63 : 0;

        let remainder = amountAdjusted;

        const threshold =
          amountAdjusted >= 600 ? 30 : amountAdjusted >= 120 ? 5 : 0;

        while (remainder >= threshold) {
          if (remainder < 0.63) {
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
        return { amount: roundedAmount, unit, ingredient };
      }
      // mass
      else if (unitType === "mass") {
        // round grams to nearest gram
        let roundedAmount =
          amountAdjusted <= 1 ? 1 : Math.round(amountAdjusted);
        return { amount: roundedAmount, unit, ingredient };
      }

      let roundedAmount = Math.round(amountAdjusted * 4) / 4 || 0.25;

      return {
        amount: roundedAmount,
        unit,
        ingredient
      };
    }
  );
  return metricIngredients;
};

export default getIngredientListMetric;
