//credit -- https://codesandbox.io/s/6R4xMwXOQ

import axios from "axios";

let errors = {};

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

export const usernameValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const { username, currentUsername } = values;

    if (!currentUsername) {
      // Check db if username is taken
      axios
        .get("/usernames", { params: { username } })
        .then(() => {
          delete errors.username;
          Object.keys(errors).length ? reject(errors) : resolve();
        })
        .catch(err => {
          errors = { ...errors, username: "This username is taken" };
          reject(errors);
        });
    }
    // Username unaltered
    else if (username.toLowerCase() === currentUsername.toLowerCase()) {
      delete errors.username;
      Object.keys(errors).length ? reject(errors) : resolve();
    }
  });
};

const emailValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const { email } = values;
    axios
      .get("/emails", { params: { email } })
      .then(() => {
        delete errors.email;
        Object.keys(errors).length ? reject(errors) : resolve();
      })
      .catch(err => {
        errors = { ...errors, email: "This email is already in use" };
        reject(errors);
      });
  });
};

const asyncValidate = combineAsyncValidation({
  username: usernameValidate,
  email: emailValidate
});

export default asyncValidate;
