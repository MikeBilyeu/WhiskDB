import {
  TOGGLE_FILTER_BUTTON_BROWSE,
  TOGGLE_FILTER_BUTTON_PROFILE
} from "../types";

export { getBrowseRecipes, getSearchRecipes } from "./get_recipes";
export { default as incrementOffset } from "./increment-offset";
export { default as updateFilterRecipe } from "./update_filter";

export const toggleFilterBtnBrowse = buttonName => {
  return { type: TOGGLE_FILTER_BUTTON_BROWSE, payload: buttonName };
};

export const toggleFilterBtnProfile = buttonName => {
  return { type: TOGGLE_FILTER_BUTTON_PROFILE, payload: buttonName };
};
