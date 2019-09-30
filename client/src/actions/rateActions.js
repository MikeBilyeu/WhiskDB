import axios from "axios";
import {
  STAR_CLICKED,
  TOGGLE_REVIEW,
  GET_RATING_DETAILS,
  GET_ERRORS,
  SUBMIT_REVIEW
} from "./types";

export const toggleReview = () => {
  return { type: TOGGLE_REVIEW };
};

export const submitReview = review => dispatch => {
  //get the user_id from the auth on backend form 'req.user'
  axios
    .post("/recipe-review", review)
    .then(() => {
      dispatch({ type: SUBMIT_REVIEW });
      dispatch(toggleReview());
      dispatch(getRatingDetails(review.recipe_id));
    })
    .catch(err => console.log(err));
};

export const getRatingDetails = recipe_id => dispatch => {
  axios
    .get("/rating-details", { params: { recipe_id } })
    .then(res => {
      dispatch({ type: GET_RATING_DETAILS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
