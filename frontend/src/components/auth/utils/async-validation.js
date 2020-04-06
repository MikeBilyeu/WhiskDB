import axios from "axios";

//combine validator function
const combineAsyncValidation = validator => {
  return async (values, dispatch, props, field) => {
    const validatorFn = validator[field];
    // check if field is undefined error occuring on form submit
    if (field) {
      await validatorFn(values, dispatch, props, field);
    }
  };
};

export const usernameValidate = async ({ username, currentUsername }) => {
  if (
    !currentUsername ||
    currentUsername.toLowerCase() !== username.toLowerCase()
  ) {
    try {
      await axios.get("/users/usernames", { params: { username } });
    } catch (err) {
      if (err.response.status === 409) {
        throw err.response.data;
      }
      throw err;
    }
  }
};

const emailValidate = async ({ email }) => {
  try {
    await axios.get("/users/emails", { params: { email } });
  } catch (err) {
    if (err.response.status === 409) {
      throw err.response.data;
    }
    throw err;
  }
};

const asyncValidate = combineAsyncValidation({
  username: usernameValidate,
  email: emailValidate
});

export default asyncValidate;
