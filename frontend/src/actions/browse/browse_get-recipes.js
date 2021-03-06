import axios from "axios";
import {
  GET_ERRORS,
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON_BROWSE
} from "../types";

export const getBrowseRecipes = () => async (dispatch, getState) => {
  // Get the user_id from state to check if user saved the recipe
  const {
    browseRecipes: { filterRecipes },
    auth: {
      user: { user_id }
    }
  } = getState();

  // Dispatch a browse request sets isFetching: true
  dispatch({ type: GET_BROWSE_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON_BROWSE, payload: null });
  dispatch({ type: SET_BROWSE_DATA, payload: { ...filterRecipes, user_id } });

  try {
    const { data } = await axios.get("/api/recipes/browse", {
      params: { ...filterRecipes, user_id }
    });
    dispatch({ type: GET_BROWSE_RECIPES, payload: data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

// dispatch an action with a type of get search request
export const getSearchRecipes = () => async (dispatch, getState) => {
  // Get the user_id from state to check if user saved the recipe
  const {
    browseRecipes: { filterRecipes },
    auth: {
      user: { user_id }
    }
  } = getState();

  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON_BROWSE, payload: null });
  dispatch({ type: SET_BROWSE_DATA, payload: { ...filterRecipes, user_id } });

  try {
    let { data } = await axios.get("/api/recipes/search", {
      params: { ...filterRecipes, user_id }
    });

    // dispatch({ type: REMOVE_RECIPES, payload: data });
    dispatch({ type: GET_BROWSE_RECIPES, payload: data });
  } catch (err) {
    console.error(err);
  }
};
