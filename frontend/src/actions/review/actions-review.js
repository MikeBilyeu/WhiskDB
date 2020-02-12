import { TOGGLE_REVIEW } from "../types";

export { default as getRatingDetails } from "./get_review";
export { default as submitReview } from "./submit_review";

export const toggleReview = () => ({ type: TOGGLE_REVIEW });
