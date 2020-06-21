const convertTimeToMin = time => {
  const timeHours = time.hours > 0 ? time.hours : 0;
  const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
  return timeHours * 60 + timeMinutes;
};

const regEx = {
  amount: /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]?\d?(( |-){0,2}[⅛¼⅓½⅔¾])|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3}( |-)[1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2})/,
  units: /^\b(cup(s?)|c|cp|tablespoon(s?)|tb(sp|s|l|ls)?|teaspoon(s?)|tsp|ts|t|lit(er|re)(s?)|l|millilit(er|re)(s?)|ml|ounce(s?)|oz|pound(s?)|lb(s?)|kilogram(s?)|kg(s?)|gram(s?)|g(s?))\b/i,
  cup: /\b(cup(s?)|c|cp)\b/i,
  tablespoon: /\b(tablespoon(s?)|tb(sp|s|l|ls)?)\b/i,
  T: /\bT\b/,
  teaspoon: /\b(teaspoon(s?)|tsp|ts)\b/i,
  t: /\bt\b/,
  liter: /\b(lit(er|re)(s?)|l)\b/i,
  milliliter: /\b(millilit(er|re)(s?)|ml)\b/i,
  ounce: /\b(ounce(s?)|oz)\b/i,
  pound: /\b(pound(s?)|lb(s?))\b/i,
  kilogram: /\b(kilogram(s?)|kg(s?))\b/i,
  gram: /\b(gram(s?)|g(s?))\b/i
};

const replaceFractionSymbols = amount => {
  let fracs = ["⅛", "¼", "⅓", "½", "⅔", "¾"];
  let replacementFracs = [" 1/8", " 1/4", " 1/3", " 1/2", " 2/3", " 3/4"];

  let index = fracs.findIndex(frac => amount.includes(frac));

  return amount.replace(fracs[index], replacementFracs[index]).trim();
};

const splitIngredientStr = ingredientStr => {
  //remove extra white space
  ingredientStr = ingredientStr.replace(/\s+/g, " ").trim();

  // match the amount from the ingredient with regex
  let amount = replaceFractionSymbols(regEx.amount.exec(ingredientStr)[0]);

  ingredientStr = ingredientStr.replace(regEx.amount, "").trim();

  const unit = regEx.units.exec(ingredientStr)
    ? regEx.units.exec(ingredientStr)[0]
    : "";

  const ingredient = ingredientStr.replace(regEx.units, "").trim();

  return { amount: `${amount} ${unit}`, ingredient };
};

module.exports = { convertTimeToMin, splitIngredientStr };
