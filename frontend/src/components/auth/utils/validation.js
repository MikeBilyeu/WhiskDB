// safari and firefox do NOT support negative loookbehinds
const usernameRegEx = /^[\d\w]{2,20}$/;
const emailRegEx = /^.+@.+\.(.)+$/i;
const passwordRegEx = /^\S{8,30}$/;

let errors = {};
const checkUsername = username => {
  if (!username) {
    errors.username = "You must enter a username";
  } else if (!usernameRegEx.test(username)) {
    errors.username = "Username must be 2-20 alphanumeric characters";
  }

  return errors;
};

const checkEmail = email => {
  if (!email) {
    errors.email = "You must enter your email address";
  } else if (!emailRegEx.test(email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const checkPassword = (password, page) => {
  if (!password) {
    errors.password = `You must enter ${
      page === "login" ? "your" : "a"
    } password`;
  } else if (!passwordRegEx.test(password) && page !== "login") {
    errors.password =
      "Password must be 8 - 30 characters, no whitespaces allowed";
  }
  return errors;
};

export const validateSignup = ({ username, email, password }) => {
  errors = {};
  checkUsername(username);
  checkEmail(email);
  checkPassword(password);
  return errors;
};

export const validateLogin = ({ email, password }) => {
  errors = {};
  checkEmail(email);
  checkPassword(password, "login");
  return errors;
};

export const validateUsername = ({ username }) => {
  errors = {};
  checkUsername(username);
  return errors;
};
