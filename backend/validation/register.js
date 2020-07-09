module.exports = function validateRegisterInput(data) {
  let errors = {};
  // store regex to check validation
  const usernameRegEx = /^[\d\w]{2,20}$/;
  const emailRegEx = /^.+@.+\.(.)+$/i;
  const passwordRegEx = /^\S{8,30}$/;

  // make sure username is 3-20 chars
  if (!data.username) {
    errors.username = "Username field is required";
  } else if (!usernameRegEx.test(data.username)) {
    errors.username = "Username must be 2-20 alphanumeric characters";
  }
  // make sure email is valid
  if (!data.email) {
    errors.email = "Email field is required";
  } else if (!emailRegEx.test(data.email)) {
    errors.email = "Email is invalid";
  }
  // make sure passwords are valid an match
  if (!data.password) {
    errors.password = "Password field is required";
  } else if (!passwordRegEx.test(data.password)) {
    errors.password = "Password must be 8 - 30 characters";
  }

  return errors;
};
