import {
  TOGGLE_FILTER_BUTTON_BROWSE,
  TOGGLE_FILTER_BUTTON_PROFILE
} from "../types";

export { getBrowseRecipes, getSearchRecipes } from "./browse_get-recipes";
export { default as incrementOffset } from "./browse_increment-offset";
export { default as updateFilterRecipe } from "./browse_update-filter";

export const toggleFilterBtnBrowse = buttonName => ({
  type: TOGGLE_FILTER_BUTTON_BROWSE,
  payload: buttonName
});

export const toggleFilterBtnProfile = buttonName => ({
  type: TOGGLE_FILTER_BUTTON_PROFILE,
  payload: buttonName
});
