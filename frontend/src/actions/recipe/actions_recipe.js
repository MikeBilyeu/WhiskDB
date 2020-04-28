import {
  TOGGLE_EDIT_RECIPE,
  TOGGLE_SHOW_MORE,
  REMOVE_SAVED_RECIPES,
  SET_PROFILE_FILTER_DATA,
  SAVED_OFFSET_INCREMENT,
  TOGGLE_SORT_BUTTON,
  TOGGLE_UNIT,
  CONVERT_SERVINGS
} from "../types";

import getSavedRecipes from "./recipe_get-saved-recipes";

export { default as createRecipe } from "./recipe_create-recipe";
export { default as submitEditRecipe } from "./recipe_edit-recipe";
export { default as deleteRecipe } from "./recipe_delete-recipe";
export { default as getRecipe } from "./recipe_get-recipe";
export { default as saveRecipe } from "./recipe_save-recipe";
export { default as unsaveRecipe } from "./recipe_unsave-recipe";
export { default as getSavedRecipes } from "./recipe_get-saved-recipes";
export { default as scrapeSite } from "./recipe_scrape-site.js";

export const toggleEditRecipe = () => {
  return { type: TOGGLE_EDIT_RECIPE };
};

export const toggleShowMore = () => {
  return { type: TOGGLE_SHOW_MORE };
};

export const incrementSavedOffset = () => dispatch => {
  dispatch({ type: SAVED_OFFSET_INCREMENT });
  dispatch(getSavedRecipes());
};

export const updateSavedFilterRecipe = option => (dispatch, getState) => {
  // Remove recipes from previous request
  dispatch({ type: REMOVE_SAVED_RECIPES });

  dispatch({
    type: SET_PROFILE_FILTER_DATA,
    payload: { category: option, offset: 0 }
  });
  dispatch(getSavedRecipes());
};

export const toggleSortButton = () => {
  return { type: TOGGLE_SORT_BUTTON };
};

export const toggleUnit = () => {
  return { type: TOGGLE_UNIT };
};

export const convertServings = number => {
  return { type: CONVERT_SERVINGS, payload: number };
};
