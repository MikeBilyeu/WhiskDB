const amountRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2})/;
const unitsRegex = /^\b(cup(s?)|c|cp|tablespoon(s?)|tb(sp|s|l|ls)?|teaspoon(s?)|tsp|ts|t|lit(er|re)(s?)|l|millilit(er|re)(s?)|ml|ounce(s?)|oz|pound(s?)|lb(s?)|kilogram(s?)|kg(s?)|gram(s?)|g(s?))\b/i;
// getting the unit from the string
const cupRegEx = /\b(cup(s?)|c|cp)\b/i;

const tablespoonRegEx = /\b(tablespoon(s?)|tb(sp|s|l|ls)?)\b/i;
//create a regex for capital T for tablespoon js regex doesn't allow partial case insensitivity
const TRegEx = /\bT\b/;

const teaspoonRegEx = /\b(teaspoon(s?)|tsp|ts)\b/i;
//create a regex for lowercase t for teaspoon js regex doesn't allow partial case insensitivity
const tRegEx = /\bt\b/;

const literRegEx = /\b(lit(er|re)(s?)|l)\b/i;

const milliliterRegEx = /\b(millilit(er|re)(s?)|ml)\b/i;

const ounceRegEx = /\b(ounce(s?)|oz)\b/i;

const poundRegEx = /\b(pound(s?)|lb(s?))\b/i;

const kilogramRegEx = /\b(kilogram(s?)|kg(s?))\b/i;

const gramRegEx = /\b(gram(s?)|g(s?))\b/i;

//convert ingredient amount from us to metric
const formatIngredientList = ingredients => {
  //map over the ingredietns array
  // create a formated list
  let formatedList = ingredients.map(ingredient => {
    //remove Extra white space
    // match the amount from the ingredient with regex
    let ingredientStr = ingredient.replace(/\s+/g, " ").trim();

    let amount = amountRegEx.exec(ingredientStr)[0];
    ingredientStr = ingredientStr.replace(amountRegEx, "").trim();
    // pull off unit
    let unit = unitsRegex.test(ingredientStr)
      ? unitsRegex.exec(ingredientStr)[0]
      : "";
    ingredientStr = ingredientStr.replace(unitsRegex, "").trim();
    // this can get fixed to prevent matching ending spaces
    let ingredientName = /^[^\((\)]*/.exec(ingredientStr)[0].trim();
    ingredientStr = ingredientStr.replace(/^[^\((\)]*/, "").trim();

    let prep = ingredientStr.replace(/[{()}]/g, "") || "";

    // // using eval to get the decimal of mixed fractions
    let decimalAmount = eval(amount.split(" ").join("+"));
    // may have to round decimal to nearest 1000th

    let metricUnit = unit;

    if (unit) {
      switch (true) {
        case cupRegEx.test(unit):
          decimalAmount *= 237;
          metricUnit = "milliliter";
          break;
        case tablespoonRegEx.test(unit):
        case TRegEx.test(unit):
          decimalAmount *= 15;
          metricUnit = "milliliter";
          break;
        case teaspoonRegEx.test(unit):
        case TRegEx.test(unit):
          decimalAmount *= 5;
          metricUnit = "milliliter";
          break;
        case literRegEx.test(unit):
          decimalAmount *= 1000;
          metricUnit = "milliliter";
          break;
        case ounceRegEx.test(unit):
          decimalAmount *= 28;
          metricUnit = "gram";
          break;
        case poundRegEx.test(unit):
          decimalAmount *= 454;
          metricUnit = "gram";
          break;
        case kilogramRegEx.test(unit):
          decimalAmount *= 1000;
          metricUnit = "gram";
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
      ingredient: ingredientName,
      prep: prep
    };
  });

  return formatedList;
};

export default formatIngredientList;
