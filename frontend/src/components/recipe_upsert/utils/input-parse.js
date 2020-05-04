export const capitalize = value => {
  return (
    value &&
    value
      .charAt(0)
      .toUpperCase()
      .trim() + value.substring(1)
  );
};

export const titleParse = value => {
  let strArr = value.match(/.{0,75}/) || [""];
  return value && strArr[0];
};

export const footnoteParse = value => {
  let strArr = value.match(/.{0,455}/) || [""];
  return value && strArr[0];
};

export const minuteParse = value => {
  let strArr = value.match(/^[1-5][\d]?/) || [""];
  return value && strArr[0];
};

export const numberParse = value => {
  let strArr = value.match(/^[1-9][\d]?/) || [""];
  return value && strArr[0];
};

export const validIngredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) (. *){3,90}?$/i;
// old export const validIngredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) ([a-z\d-,/+.%&*!] *){3,40}( \( *([a-z\d-,/+.%&*!] *){1,40}\) *)?$/i;
