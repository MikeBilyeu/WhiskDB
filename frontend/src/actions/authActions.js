import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SubmissionError } from "redux-form";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_USER,
  TOGGLE_DELETE
} from "./types";

export const registerUser = userData => dispatch => {
  // first register the user if the user successfully register
  // dispatch a login action signup component will watch for user auth and
  // redirect to /profile page if authenticated
  axios
    .post("/register", userData)
    .then(res => {
      dispatch(
        loginUser({ email: userData.email, password: userData.password })
      );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteUser = () => dispatch => {
  axios
    .delete("/delete-user")
    .then(res => {
      dispatch(logoutUser());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get user data
export const getUser = () => dispatch => {
  return axios
    .get("/user")
    .then(user => {
      dispatch({ type: GET_USER, payload: user.data });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  return axios
    .post("/login", userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      throw new SubmissionError(err.response.data);
    });
};

//edit profile
export const editProfile = (userData, history) => dispatch => {
  return axios
    .post("/edit-profile", userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user

      dispatch(setCurrentUser(decoded));
      dispatch(getUser());

      return history.push(`/profile/`);
    })
    .catch(err => {
      throw new SubmissionError(err.response.data);
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Toggle delete component
export const toggleDelete = () => {
  return {
    type: TOGGLE_DELETE
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};