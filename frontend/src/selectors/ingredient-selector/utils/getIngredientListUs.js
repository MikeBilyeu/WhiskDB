import increments from "./increments";

const { metricIncrements, usIncrements } = increments;

const getIngredientListUs = metricIngredients => {
  console.log("metricIngredients:", metricIngredients);

  const usIngredients = metricIngredients.map(
    ({ amount, unit, ingredient }) => {
      let remainder = amount;

      let amounts = [];

      if (unit === "ml") {
        while (remainder >= 0.63) {
          for (let i = 0; i < metricIncrements.length; i++) {
            if (remainder >= metricIncrements[i]) {
              if (remainder >= metricIncrements[0]) {
                amounts.push({
                  amount: Math.floor(remainder / metricIncrements[0]),
                  unit: usIncrements[0][1]
                });

                remainder -=
                  Math.floor(remainder / metricIncrements[0]) *
                  metricIncrements[0];
              } else {
                remainder -= metricIncrements[i];
                amounts.push({
                  amount: usIncrements[i][0],
                  unit: usIncrements[i][1]
                });
              }
            } else if (remainder < 0.63) {
              break;
            }
          }
        }
        return { amount: amounts, unit, ingredient };
      }

      if (unit === "g") {
        let pounds = Math.floor(amount / 454);
        // sets the decimal precision depending on amount
        let fixedTo = amount <= 1 ? 3 : 1;
        let ounces = ((amount % 454) / 28.35).toFixed(fixedTo);

        if (pounds > 0) {
          amounts.push({
            amount: pounds,
            unit: "lbs"
          });
        }
        if (ounces > 0.0) {
          amounts.push({
            amount: ounces,
            unit: "oz"
          });
        }
        return { amount: amounts, unit, ingredient };
      }
      return { amount, unit, ingredient };
    }
  );
  return usIngredients;
};

export default getIngredientListUs;
