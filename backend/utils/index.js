const convertTimeToMin = time => {
  const timeHours = time.hours > 0 ? time.hours : 0;
  const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
  return timeHours * 60 + timeMinutes;
};

const regEx = {
  amount: /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]?\d?(( |-){0,2}[⅛¼⅓½⅔¾])|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3}( |-)[1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2})/,
  units: /^\b((cup(s?)|(cp|c)\.?)|(tablespoon(s?)|(tb(sp|s|l|ls)?)\.?)|(teaspoon(s?)|(tsp|ts|t)\.?)|(lit(er|re)(s?)|l\.?)|(millilit(er|re)(s?)|ml\.?)|(ounce(s?)|oz\.?)|(pound(s?)|lb(s?)\.?)|(kilo(gram(s?))?|kg(s?)\.?)|(gram(s?)|g(s?)\.?))(?=\s)/i
};

const replaceFractionSymbols = amount => {
  let fracs = ["⅛", "¼", "⅓", "½", "⅔", "¾"];
  let replacementFracs = [" 1/8", " 1/4", " 1/3", " 1/2", " 2/3", " 3/4"];

  let index = fracs.findIndex(frac => amount.includes(frac));

  return amount.replace(fracs[index], replacementFracs[index]).trim();
};

const removeWhiteSpace = s =>
  s
    .replace(/ +/gm, " ")
    .replace(/^[ \n]+|[ \n]+$/gm, "")
    .replace(/\n+/g, "\n");

const splitIngredientStr = ingredientList =>
  removeWhiteSpace(ingredientList)
    .split(/\n/)
    .map(ing => {
      // match the amount from the ingredient with regex
      let amount = replaceFractionSymbols(regEx.amount.exec(ing)[0]);
      ing = ing.replace(regEx.amount, "").replace(/^ /, "");

      // match the unit from the ingredient with regex if has unit
      amount = regEx.units.exec(ing)
        ? `${amount} ${regEx.units.exec(ing)[0]}`
        : amount;

      ing = ing.replace(regEx.units, "").replace(/^ /, "");

      return { amount, ingredient: ing };
    });

module.exports = { convertTimeToMin, splitIngredientStr };
