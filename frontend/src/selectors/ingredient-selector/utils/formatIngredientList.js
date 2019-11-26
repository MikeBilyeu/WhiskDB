import regEx from "./ingredientRegex";

//convert ingredient amount from us to metric
const formatIngredientList = ingredients => {
  let formatedList = ingredients.map(ingredient => {
    //remove Extra white space
    let ingredientStr = ingredient.replace(/\s+/g, " ").trim();

    // match the amount from the ingredient with regex
    let amount = regEx.amount.exec(ingredientStr)[0];

    // using eval to get the decimal of mixed fractions
    let decimalAmount = eval(amount.split(" ").join("+"));
    // may have to round decimal to nearest 1000th

    ingredientStr = ingredientStr.replace(regEx.amount, "").trim();

    // pull off unit
    let unit = regEx.units.test(ingredientStr)
      ? regEx.units.exec(ingredientStr)[0]
      : "";

    ingredientStr = ingredientStr.replace(regEx.units, "").trim();

    // this can get fixed to prevent matching ending spaces
    const ingredientName = ingredientStr;

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
      ingredient: ingredientName
    };
  });

  return formatedList;
};

export default formatIngredientList;
