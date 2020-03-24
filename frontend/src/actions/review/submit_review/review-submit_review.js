import axios from "axios";
import { SUBMIT_REVIEW } from "../../types";
import getRatingPercentage from "../get_rating_percentage";
import { toggleReview } from "../actions-review";

const submitReview = review => async dispatch => {
  try {
    await axios.post("/recipe/review", review);
    dispatch({ type: SUBMIT_REVIEW });
    dispatch(toggleReview());
    dispatch(getRatingPercentage(review.recipe_id));
  } catch (err) {
    console.error(err);
  }
};

export default submitReview;
