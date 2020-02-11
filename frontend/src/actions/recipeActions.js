import axios from "axios";
import { change } from "redux-form";
import {
  GET_ERRORS,
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  GET_MY_RECIPES,
  GET_MY_RECIPES_REQUEST,
  TOGGLE_UNIT,
  CONVERT_SERVINGS,
  SORT_SAVED_RECIPES,
  TOGGLE_SORT_BUTTON,
  GET_SCRAPE_URL_REQUEST,
  TOGGLE_FILTER_BUTTON_PROFILE,
  SET_PROFILE_FILTER_DATA
} from "./types";

export const scrapeSite = URL => async dispatch => {
  dispatch({ type: GET_SCRAPE_URL_REQUEST });
  try {
    const { data: recipe } = await axios.get("/scrape-url", {
      params: { URL }
    });
    console.log(recipe);
    dispatch(change("newRecipe", "image_url", recipe.image_url));
    dispatch(change("newRecipe", "title", recipe.title));
    dispatch(change("newRecipe", "servings", recipe.servings));
    dispatch(change("newRecipe", "ingredients", recipe.ingredients));
    dispatch(change("newRecipe", "time", recipe.time));
    dispatch(change("newRecipe", "directions", recipe.directions));
    dispatch(change("newRecipe", "keywords", recipe.keywords));
  } catch (err) {
    console.error(err);
  }
};

export const getSavedRecipes = () => async (dispatch, getState) => {
  const {
    auth: { filterRecipes }
  } = getState();

  dispatch({ type: GET_SAVED_RECIPES_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON_PROFILE, payload: null });
  dispatch({ type: SET_PROFILE_FILTER_DATA, payload: filterRecipes });

  try {
    const res = await axios.get("/save-recipe", { params: filterRecipes });
    dispatch({ type: GET_SAVED_RECIPES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const getMyRecipes = () => async (dispatch, getState) => {
  const {
    auth: { filterRecipes }
  } = getState();

  dispatch({ type: GET_MY_RECIPES_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON_PROFILE, payload: null });
  dispatch({ type: SET_PROFILE_FILTER_DATA, payload: filterRecipes });
  try {
    const res = await axios.get("/my-recipe", { params: filterRecipes });
    dispatch({ type: GET_MY_RECIPES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const updateFilterRecipe = option => (dispatch, getState) => {
  dispatch({ type: SET_PROFILE_FILTER_DATA, payload: { meal: option } });
  dispatch(getMyRecipes());
  dispatch(getSavedRecipes());
};

export const sortSavedRecipes = sortBy => dispatch => {
  dispatch({ type: SORT_SAVED_RECIPES, payload: sortBy });
  dispatch({ type: TOGGLE_SORT_BUTTON });
};

export const toggleSortButton = () => {
  return { type: TOGGLE_SORT_BUTTON };
};

export const toggleUnit = unit => {
  return { type: TOGGLE_UNIT };
};

export const convertServings = number => {
  return { type: CONVERT_SERVINGS, payload: number };
};
