import axios from "axios";

import {
  GET_ERRORS,
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON,
  OFFSET_INCREMENT,
  REMOVE_RECIPES
} from "./types";

// dispatch an action with a type of get browse request
export const getBrowseRecipes = () => async (dispatch, getState) => {
  // Get the user_id from state to check if user saved the recipe
  const {
    auth: {
      user: { user_id }
    },
    browseRecipes: { filterRecipes }
  } = getState();

  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: null });
  dispatch({ type: SET_BROWSE_DATA, payload: filterRecipes });

  // make axios request
  try {
    const res = await axios.get("/browse-recipe", {
      params: { filterRecipes, user_id }
    });

    dispatch({ type: GET_BROWSE_RECIPES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const updateFilterRecipe = (type, option) => (dispatch, getState) => {
  dispatch({
    type: SET_BROWSE_DATA,
    payload: { [type]: option, search: "", offset: 0 }
  });
  // Remove recipes from previous request
  dispatch({ type: REMOVE_RECIPES });
  dispatch(getBrowseRecipes());
};

export const incrementOffset = () => dispatch => {
  dispatch({ type: OFFSET_INCREMENT });
  dispatch(getBrowseRecipes());
};

// dispatch an action with a type of get search request
export const getSearchRecipes = () => (dispatch, getState) => {
  // Get the user_id from state to check if user saved the recipe
  const {
    auth: {
      user: { user_id }
    },
    browseRecipes: { filterRecipes }
  } = getState();

  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });

  dispatch({ type: SET_BROWSE_DATA, payload: filterRecipes });
  // close filter buttons
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: null });

  // make axios request
  axios
    .get("/search-recipe", { params: { filterRecipes, user_id } })
    .then(res => {
      dispatch({ type: GET_BROWSE_RECIPES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const toggleFilterButton = buttonName => {
  return { type: TOGGLE_FILTER_BUTTON, payload: buttonName };
};
