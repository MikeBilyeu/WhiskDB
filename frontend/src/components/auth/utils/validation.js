// safari and firefox do NOT support negative loookbehinds
const usernameRegEx = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]{1,20}$/;
const emailRegEx = /^.+@.+\.(.)+$/i;
const passwordRegEx = /^\S{8,30}$/;

let errors = {};
export const checkUsername = username => {
  delete errors.username;
  if (!username) {
    errors.username = "You must enter a username";
  } else if (!usernameRegEx.test(username)) {
    errors.username = "Username must be 2-20 alphanumeric characters";
  }
  return errors;
};

export const checkEmail = email => {
  delete errors.email;
  if (!email) {
    errors.email = "You must enter your email address";
  } else if (!emailRegEx.test(email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export const checkPassword = (password, page) => {
  delete errors.password;
  if (!password) {
    errors.password = "You must enter your password";
  } else if (!passwordRegEx.test(password) && page !== "login") {
    errors.password =
      "Password must be 8 - 30 characters, no whitespaces allowed";
  }
  return errors;
};

export const validateSignup = ({ username, email, password }) => {
  checkUsername(username);
  checkEmail(email);
  checkPassword(password);
  return errors;
};

export const validateLogin = ({ email, password }) => {
  checkEmail(email);
  checkPassword(password, "login");
  return errors;
};

export const validateUsername = ({ username }) => {
  checkUsername(username);
  return errors;
};
