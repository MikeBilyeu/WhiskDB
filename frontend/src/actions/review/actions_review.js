import { TOGGLE_REVIEW } from "../types";

export { default as getRatingPercentage } from "./review_get-rating-percentage";
export { default as getRecentReviews } from "./review_get-recent-reviews";
export { default as submitReview } from "./review_submit-review";

export const toggleReview = toggle => ({
  type: TOGGLE_REVIEW,
  payload: toggle
});
