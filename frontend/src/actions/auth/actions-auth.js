import { SET_CURRENT_USER, USER_LOADING, TOGGLE_DELETE } from "../types";
import jwt_decode from "jwt-decode";
export { default as deleteUser } from "./delete-user";
export { default as editProfile } from "./edit-profile";
export { default as getUser } from "./get-user";
export { default as googleLogin } from "./login-google";
export { default as loginUser } from "./login-user";
export { default as logoutUser } from "./logout-user";
export { default as registerUser } from "./register-user";

export const setCurrentUser = token => {
  return {
    type: SET_CURRENT_USER,
    payload: token ? jwt_decode(token) : {}
  };
};

export const setUserLoading = () => ({
  type: USER_LOADING
});

export const toggleDelete = () => ({
  type: TOGGLE_DELETE
});
