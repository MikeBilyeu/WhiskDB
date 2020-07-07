const regEx = {
  amount: /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]?\d?(( |-){0,2}[⅛¼⅓½⅔¾])|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3}( |-)[1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2})/,
  units: /^\b((cup(s?)|(cp|c)\.?)|(tablespoon(s?)|(tb(sp|s|l|ls)?)\.?)|(teaspoon(s?)|(tsp|ts|t)\.?)|(lit(er|re)(s?)|l\.?)|(millilit(er|re)(s?)|ml\.?)|(ounce(s?)|oz\.?)|(pound(s?)|lb(s?)\.?)|(kilo(gram(s?))?|kg(s?)\.?)|(gram(s?)|g(s?)\.?))(?=\s)/i,
  cup: /^(cup(s?)|(cp|c)\.?)/i,
  tablespoon: /^(tablespoon(s?)|(tb(sp|s|l|ls)?)\.?)/i,
  upperCaseT: /^T\.?/,
  teaspoon: /^(teaspoon(s?)|(tsp|ts|t)\.?)/i,
  liter: /^(lit(er|re)(s?)|l\.?)/i,
  milliliter: /^(millilit(er|re)(s?)|ml\.?)/i,
  ounce: /^(ounce(s?)|oz\.?)/i,
  pound: /^(pound(s?)|lb(s?)\.?)/i,
  kilogram: /^(kilo(gram(s?))?|kg(s?)\.?)/i,
  gram: /^(gram(s?)|g(s?)\.?)/i
};

//create a regex for capital T for tablespoon js regex doesn't allow partial case insensitivity
export default regEx;
