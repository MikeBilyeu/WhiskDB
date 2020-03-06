import regEx from "./ingredientRegex";

const replaceFractionSymbols = amount => {
  let fracs = ["⅛", "¼", "⅓", "½", "⅔", "¾"];
  let replacementFracs = [" 1/8", " 1/4", " 1/3", " 1/2", " 2/3", " 3/4"];

  let index = fracs.findIndex(frac => amount.includes(frac));

  return amount.replace(fracs[index], replacementFracs[index]).trim();
};

export const splitIngredientStr = ingredientStr => {
  //remove extra white space
  ingredientStr = ingredientStr.replace(/\s+/g, " ").trim();

  // match the amount from the ingredient with regex
  let amount = replaceFractionSymbols(regEx.amount.exec(ingredientStr)[0]);

  ingredientStr = ingredientStr.replace(regEx.amount, "").trim();

  const unit = regEx.units.exec(ingredientStr)
    ? regEx.units.exec(ingredientStr)[0]
    : "";

  const ingredient = ingredientStr.replace(regEx.units, "").trim();

  return { amount, unit, ingredient };
};

const getMetricAmount = (amount, unit) => {
  // using eval to get the decimal of mixed fractions
  let decimalAmount = eval(amount.split(/[ -]+/).join("+"));
  let metricUnit = "";
  switch (true) {
    case regEx.cup.test(unit):
      decimalAmount *= 240;
      metricUnit = "ml";
      break;
    case regEx.tablespoon.test(unit):
    case regEx.T.test(unit):
      decimalAmount *= 15;
      metricUnit = "ml";
      break;
    case regEx.teaspoon.test(unit):
    case regEx.t.test(unit):
      decimalAmount *= 5;
      metricUnit = "ml";
      break;
    case regEx.milliliter.test(unit):
      decimalAmount *= 1;
      metricUnit = "ml";
      break;
    case regEx.liter.test(unit):
      decimalAmount *= 1000;
      metricUnit = "ml";
      break;
    case regEx.ounce.test(unit):
      decimalAmount *= 28.35;
      metricUnit = "g";
      break;
    case regEx.pound.test(unit):
      decimalAmount *= 453.592;
      metricUnit = "g";
      break;
    case regEx.kilogram.test(unit):
      decimalAmount *= 1000;
      metricUnit = "g";
      break;
    case regEx.gram.test(unit):
      decimalAmount *= 1;
      metricUnit = "g";
      break;
    default:
      break;
  }
  return { decimalAmount, metricUnit };
};

//convert ingredient amount from us to metric
const formatIngredientList = ingredientList => {
  return ingredientList.map(ingredientStr => {
    const { amount, unit, ingredient } = splitIngredientStr(ingredientStr);
    const { decimalAmount, metricUnit } = getMetricAmount(amount, unit);

    return {
      amount: decimalAmount.toString(),
      unit: metricUnit,
      ingredient: ingredient
    };
  });
};

export default formatIngredientList;
