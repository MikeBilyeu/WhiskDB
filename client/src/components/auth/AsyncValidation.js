import axios from "axios";

//credit -- https://codesandbox.io/s/6R4xMwXOQ

//combine validator function
const combineAsyncValidation = validator => {
  return async (values, dispatch, props, field) => {
    const validatorFn = validator[field];
    await validatorFn(values, dispatch, props, field);
  };
};

const usernameValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const { username } = values;
    axios
      .get("/usernames", { params: { username } })
      .then(() => {
        resolve();
      })
      .catch(err => {
        if (err.response.status === 409) {
          reject({ username: "This username is already taken" });
        }
      });
  });
};

const emailValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const { email } = values;
    axios
      .get("/emails", { params: { email } })
      .then(() => {
        resolve();
      })
      .catch(err => {
        if (err.response.status === 409) {
          reject({ email: "This email is already in use" });
        }
      });
  });
};

const asyncValidate = combineAsyncValidation({
  username: usernameValidate,
  email: emailValidate
});

export default asyncValidate;
