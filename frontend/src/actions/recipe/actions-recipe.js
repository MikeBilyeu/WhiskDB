import { TOGGLE_EDIT_RECIPE, TOGGLE_SHARE } from "../types";

export { default as createRecipe } from "./create-recipe";
export { default as submitEditRecipe } from "./edit-recipe";
export { default as imageUpload } from "./image-upload";
export { default as getRecipe } from "./get-recipe";
export { default as saveRecipe } from "./save-recipe";

export const toggleEditRecipe = () => {
  return { type: TOGGLE_EDIT_RECIPE };
};

export const toggleShare = () => {
  return { type: TOGGLE_SHARE };
};
