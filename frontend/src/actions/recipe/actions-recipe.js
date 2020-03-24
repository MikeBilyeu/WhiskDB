import { TOGGLE_EDIT_RECIPE, TOGGLE_SHOW_MORE } from "../types";

export { default as createRecipe } from "./create-recipe";
export { default as submitEditRecipe } from "./edit-recipe";
export { default as getRecipe } from "./get-recipe";
export { default as saveRecipe } from "./save-recipe";
export { default as getSavedRecipes } from "./get-saved-recipes";

export const toggleEditRecipe = () => {
  return { type: TOGGLE_EDIT_RECIPE };
};

export const toggleShowMore = () => {
  return { type: TOGGLE_SHOW_MORE };
};
