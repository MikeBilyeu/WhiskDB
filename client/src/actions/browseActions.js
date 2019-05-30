import axios from "axios";

import {
  GET_ERRORS,
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON
} from "./types";

// dispatch an action with a type of get browse request
export const getBrowseRecipes = browseData => dispatch => {
  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: "Meal" });
  dispatch({ type: SET_BROWSE_DATA, payload: browseData });

  // make axios request
  axios
    .get("/browse-recipe", { params: { browseData } })
    .then(res => {
      dispatch({ type: GET_BROWSE_RECIPES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// dispatch an action with a type of get search request
export const getSearchRecipes = browseData => dispatch => {
  // close filter buttons
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: "Meal" });
  //if string is not whitespace

  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });
  // make axios request
  axios
    .get("/search-recipe", { params: { browseData } })
    .then(res => {
      dispatch({ type: GET_BROWSE_RECIPES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const setSearchTerm = browseData => dispatch => {
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: "Meal" });
  dispatch({ type: SET_BROWSE_DATA, payload: browseData });
};

export const toggleFilterButton = buttonName => {
  return { type: TOGGLE_FILTER_BUTTON, payload: buttonName };
};
