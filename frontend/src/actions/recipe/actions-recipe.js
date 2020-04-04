import {
  TOGGLE_EDIT_RECIPE,
  TOGGLE_SHOW_MORE,
  REMOVE_SAVED_RECIPES,
  SET_PROFILE_FILTER_DATA,
  SAVED_OFFSET_INCREMENT
} from "../types";

import getSavedRecipes from "./get-saved-recipes";

export { default as createRecipe } from "./create-recipe";
export { default as submitEditRecipe } from "./edit-recipe";
export { default as deleteRecipe } from "./delete-recipe";
export { default as getRecipe } from "./get-recipe";
export { default as saveRecipe } from "./save-recipe";
export { default as getSavedRecipes } from "./get-saved-recipes";

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
    payload: { meal: option, offset: 0 }
  });
  dispatch(getSavedRecipes());
};
