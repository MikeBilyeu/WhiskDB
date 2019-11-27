import regEx from "./ingredientRegex";

const splitIngredientStr = ingredientStr => {
  //remove extra white space
  ingredientStr = ingredientStr.replace(/\s+/g, " ").trim();

  // match the amount from the ingredient with regex
  const amount = regEx.amount.exec(ingredientStr)[0];

  ingredientStr = ingredientStr.replace(regEx.amount, "").trim();

  const unit = regEx.units.exec(ingredientStr)[0] || "";

  const ingredient = ingredientStr.replace(regEx.units, "").trim();

  return { amount, unit, ingredient };
};

//convert ingredient amount from us to metric
const formatIngredientList = ingredientList => {
  let formatedList = ingredientList.map(ingredientStr => {
    let { amount, unit, ingredient } = splitIngredientStr(ingredientStr);

    // using eval to get the decimal of mixed fractions
    let decimalAmount = eval(amount.split(" ").join("+"));
    // may have to round decimal to nearest 1000th

    let metricUnit = unit;

    if (unit) {
      switch (true) {
        case regEx.cup.test(unit):
          decimalAmount *= 237;
          metricUnit = "ml";
          break;
        case regEx.tablespoon.test(unit):
        case regEx.T.test(unit):
          decimalAmount *= 15;
          metricUnit = "ml";
          break;
        case regEx.teaspoon.test(unit):
        case regEx.T.test(unit):
          decimalAmount *= 5;
          metricUnit = "ml";
          break;
        case regEx.liter.test(unit):
          decimalAmount *= 1000;
          metricUnit = "ml";
          break;
        case regEx.ounce.test(unit):
          decimalAmount *= 28;
          metricUnit = "g";
          break;
        case regEx.pound.test(unit):
          decimalAmount *= 454;
          metricUnit = "g";
          break;
        case regEx.kilogram.test(unit):
          decimalAmount *= 1000;
          metricUnit = "g";
          break;
        default:
          break;
      }
      unit = metricUnit;
    }

    amount = decimalAmount.toString();

    return {
      amount: amount,
      unit: unit,
      ingredient: ingredient
    };
  });
  console.log(formatedList);

  return formatedList;
};

export default formatIngredientList;
