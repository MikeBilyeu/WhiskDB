import { TOGGLE_REVIEW } from "../types";

export { default as getRatingPercentage } from "./get_rating_percentage";
export { default as getRecipeReview } from "./get-recipe-review";
export { default as submitReview } from "./submit_review";

export const toggleReview = toggle => ({
  type: TOGGLE_REVIEW,
  payload: toggle
});
