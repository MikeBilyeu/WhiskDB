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

export const getBrowseRecipes = () => async (dispatch, getState) => {
  // Get the user_id from state to check if user saved the recipe
  const {
    auth: {
      user: { user_id }
    },
    browseRecipes: { filterRecipes }
  } = getState();

  // Dispatch a browse request sets isFetching: true
  dispatch({ type: GET_BROWSE_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON, payload: null });
  dispatch({ type: SET_BROWSE_DATA, payload: filterRecipes });

  try {
    const { data } = await axios.get("/browse-recipe", {
      params: { filterRecipes, user_id }
    });

    dispatch({ type: GET_BROWSE_RECIPES, payload: data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const updateFilterRecipe = (type, value) => (dispatch, getState) => {
  console.log("type:", type);
  // Remove recipes from previous request
  dispatch({ type: REMOVE_RECIPES });

  if (type === "search") {
    dispatch({
      type: SET_BROWSE_DATA,
      payload: { [type]: value, offset: 0, meal: "All Meals" }
    });
    dispatch(getSearchRecipes());
  } else {
    dispatch({
      type: SET_BROWSE_DATA,
      payload: { [type]: value, offset: 0, search: "" }
    });
    dispatch(getBrowseRecipes());
  }
};

export const incrementOffset = () => (dispatch, getState) => {
  const {
    browseRecipes: { filterRecipes }
  } = getState();

  if (filterRecipes.search) {
    dispatch({ type: OFFSET_INCREMENT });
    dispatch(getSearchRecipes(filterRecipes));
  } else {
    dispatch({ type: OFFSET_INCREMENT });
    dispatch(getBrowseRecipes());
  }
};

// dispatch an action with a type of get search request
export const getSearchRecipes = () => async (dispatch, getState) => {
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

  try {
    let { data } = await axios.get("/search-recipe", {
      params: { filterRecipes, user_id }
    });

    // dispatch({ type: REMOVE_RECIPES, payload: data });
    dispatch({ type: GET_BROWSE_RECIPES, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const toggleFilterButton = buttonName => {
  return { type: TOGGLE_FILTER_BUTTON, payload: buttonName };
};
