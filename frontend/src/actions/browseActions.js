import axios from "axios";

import {
  GET_ERRORS,
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON
} from "./types";

// dispatch an action with a type of get browse request
export const getBrowseRecipes = browseData => async (dispatch, getState) => {
  // Get the user_id from state to check if user saved the recipe
  const {
    auth: {
      user: { user_id }
    }
  } = getState();

  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: null });
  dispatch({ type: SET_BROWSE_DATA, payload: browseData });

  // make axios request
  try {
    const res = await axios.get("/browse-recipe", {
      params: { browseData, user_id }
    });

    dispatch({ type: GET_BROWSE_RECIPES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

// dispatch an action with a type of get search request
export const getSearchRecipes = browseData => (dispatch, getState) => {
  // Get the user_id from state to check if user saved the recipe
  const {
    auth: {
      user: { user_id }
    }
  } = getState();

  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });

  dispatch({ type: SET_BROWSE_DATA, payload: browseData });
  // close filter buttons
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: null });

  // make axios request
  axios
    .get("/search-recipe", { params: { browseData, user_id } })
    .then(res => {
      dispatch({ type: GET_BROWSE_RECIPES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const toggleFilterButton = buttonName => {
  return { type: TOGGLE_FILTER_BUTTON, payload: buttonName };
};
