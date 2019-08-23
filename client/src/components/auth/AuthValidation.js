// safari and firefox do NOT support negative loookbehinds
const usernameRegEx = /^[\d\w]{2,20}$/;
const emailRegEx = /^.+@.+\.(.)+$/i;
const passwordRegEx = /^\S{8,30}$/;

let errors = {};
const validateUsername = username => {
  if (!username) {
    errors.username = "You must enter a username";
  } else if (!usernameRegEx.test(username)) {
    errors.username = "Username must be 2-20 alphanumeric characters";
  }

  return errors;
};

const validateEmail = email => {
  if (!email) {
    errors.email = "You must enter an email address";
  } else if (!emailRegEx.test(email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const validatePassword = password => {
  if (!password) {
    errors.password = "You must enter a password";
  } else if (!passwordRegEx.test(password)) {
    errors.password =
      "Password must be 8 - 30 characters, no whitespaces allowed";
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
