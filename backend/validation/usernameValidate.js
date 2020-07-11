module.exports = function validateUsername(username) {
  let errors = {};
  // store regex to check validation
  const usernameRegEx = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]{1,20}$/;

  // make sure username is 2-20 chars
  if (!username) {
    errors.username = "Username field is required";
  } else if (!usernameRegEx.test(username)) {
    errors.username = "Username must be 2-20 alphanumeric characters";
  }

  return errors;
};
