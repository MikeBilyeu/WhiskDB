module.exports = function validateRegisterInput(data) {
  let errors = {};

  let userNameRegEx = /^(?=.{2,20}$)(?![_])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_])$/;
  let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  let passwordRegEx = /^\S{8,30}$/;

  if (!data.username) {
    errors.username = "Username field is required";
  } else if (!userNameRegEx.test(data.username)) {
    errors.username = "Username must be 3-20 alphanumeric characters";
  }

  if (!data.email) {
    errors.email = "Email field is required";
  } else if (!emailRegEx.test(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (!data.password) {
    errors.password = "Password field is required";
  }
  if (!data.password2) {
    errors.password2 = "Confirm password field is required";
  }
  if (!passwordRegEx.test(data.password)) {
    errors.password = "Password must be 6 - 30 characters";
  }
  if (data.password !== data.password2) {
    errors.password2 = "Passwords must match";
  }

  return errors;
};
