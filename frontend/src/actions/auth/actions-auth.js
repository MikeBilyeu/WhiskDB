import { SET_CURRENT_USER, USER_LOADING, TOGGLE_DELETE } from "../types";

import getUser from "./get-user";
export { default as deleteUser } from "./delete-user";
export { default as editProfile } from "./edit-profile";
export { default as getUser } from "./get-user";
export { default as googleLogin } from "./login-google";
export { default as loginUser } from "./login-user";
export { default as logoutUser } from "./logout-user";
export { default as registerUser } from "./register-user";

export const setCurrentUser = decodedToken => async dispatch => {
  const isAuthenticated = Object.keys(decodedToken).length !== 0;
  if (isAuthenticated) await dispatch(getUser());
  dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });
};

export const setUserLoadin = () => ({
  type: USER_LOADING
});

export const toggleDelete = () => ({
  type: TOGGLE_DELETE
});
