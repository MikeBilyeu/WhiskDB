module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Check if the email is empty so error res is correct
  if (!data.email) {
    errors.email = "Email field is required";
    // check if the email is a valid email address so error res is correct
  } else if (!/^.+@.+\.(.)+$/i.test(data.email)) {
    errors.email = "Email is invalid";
  }

  // check if password if empty so error res is correct
  if (!data.password) {
    errors.password = "Password field is required";
  }

  return errors;
};
