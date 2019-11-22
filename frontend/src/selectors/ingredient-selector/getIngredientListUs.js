import increments from "./increments";

const { metricIncrements, usIncrements } = increments;

const getIngredientListUs = metricIngredients => {
  const usIngredients = metricIngredients.map(ingredientObj => {
    let remainder = ingredientObj.amount;
    let amounts = [];

    if (ingredientObj.unit === "milliliter") {
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
  return usIngredients;
};

export default getIngredientListUs;
