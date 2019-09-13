module.exports = function validateRegisterInput(data) {
  let errors = {};
  // store regex to check validation
  const usernameRegEx = /^[\d\w]{2,20}$/;

  // make sure username is 2-20 chars
  if (!data.username) {
    errors.username = "Username field is required";
  } else if (!usernameRegEx.test(data.username)) {
    errors.username = "Username must be 2-20 alphanumeric characters";
  }

  return errors;
};
