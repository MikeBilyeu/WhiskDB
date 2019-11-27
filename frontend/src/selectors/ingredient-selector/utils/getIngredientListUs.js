import increments from "./increments";

const { metricIncrements, usIncrements } = increments;

const getIngredientListUs = metricIngredients => {
  console.log("metricIngredients:", metricIngredients);

  const usIngredients = metricIngredients.map(
    ({ amount, unit, ingredient }) => {
      let remainder = amount;

      let amounts = [];

      const unitType =
        unit === "ml" ? "volume" : unit === "g" ? "mass" : undefined;

      if (unitType === "volume") {
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
                if (
                  amounts[amounts.length - 1] &&
                  amounts[amounts.length - 1].unit === usIncrements[i][1]
                ) {
                  let joinedAmount = `${amounts[amounts.length - 1].amount}${
                    usIncrements[i][0]
                  }`;
                  // join the amounts
                  amounts[amounts.length - 1] = {
                    amount: joinedAmount,
                    unit: usIncrements[i][1]
                  };
                } else {
                  amounts.push({
                    amount: usIncrements[i][0],
                    unit: usIncrements[i][1]
                  });
                }
              }
            } else if (remainder < 0.63) {
              break;
            }
          }
        }
        return { amount: amounts, ingredient };
      }

      if (unitType === "mass") {
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

        return { amount: amounts, ingredient };
      }
      return { amount, ingredient };
    }
  );
  console.log("usIngredients:", usIngredients);
  return usIngredients;
};

export default getIngredientListUs;
