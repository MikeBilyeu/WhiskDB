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
  let strArr = value.match(/.{0,55}/) || [""];
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
