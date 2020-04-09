import axios from "axios";
import { SUBMIT_REVIEW, TOGGLE_REVIEW } from "../types";
import getRatingPercentage from "./review_get-rating-percentage";

const submitReview = review => async dispatch => {
  try {
    await axios.post("/recipes/review", review);
    dispatch({ type: SUBMIT_REVIEW });
    dispatch({ type: TOGGLE_REVIEW });
    dispatch(getRatingPercentage(review.recipe_id));
  } catch (err) {
    console.error(err);
  }
};

export default submitReview;
