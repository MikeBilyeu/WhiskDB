import axios from "axios";
import {
  GET_RECIPE_REVIEWS,
  GET_MY_RECIPE_REVIEW,
  GET_ERRORS
} from "../types.js";

const getRecentReviews = recipe_id => async dispatch => {
  try {
    const { data } = await axios.get("/api/recipes/reviews", {
      params: { recipe_id }
    });

    if (data) {
      dispatch({ type: GET_RECIPE_REVIEWS, payload: data });
    }

    const myReview = await axios.get("/api/recipes/my-review", {
      params: { recipe_id }
    });
    if (myReview.data) {
      dispatch({ type: GET_MY_RECIPE_REVIEW, payload: myReview.data });
    }
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRecentReviews;
