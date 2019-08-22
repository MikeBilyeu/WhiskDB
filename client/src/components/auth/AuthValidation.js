// safari and firefox do NOT support negative loookbehinds
// let userNameRegEx = /^(?=.{2,20}$)(?![_])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_])$/;
const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegEx = /^\S{8,30}$/;

let errors = {};
const validateUsername = username => {
  //
  // if (!formValues.username) {
  //   errors.username = "You must enter a username";
  // } else if (!userNameRegEx.test(formValues.username)) {
  //   errors.username = "Username must be 3-20 alphanumeric characters";
  // }

  return errors;
};

const validateEmail = email => {
  if (!email) {
    errors.email = "You must enter email address";
  } else if (!emailRegEx.test(email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const validatePassword = password => {
  if (!password) {
    errors.password = "You must enter a password";
  } else if (!passwordRegEx.test(password)) {
    errors.password = "Password must be 6 - 30 characters";
  }
  return errors;
};

export const ValidateSignup = ({ username, email, password }) => {
  errors = {};
  validateUsername(username);
  validateEmail(email);
  validatePassword(password);
  return errors;
};
