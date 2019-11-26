const regEx = {
  amount: /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2})/,
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

//create a regex for capital T for tablespoon js regex doesn't allow partial case insensitivity

//create a regex for lowercase t for teaspoon js regex doesn't allow partial case insensitivity
export default regEx;
