import axios from "axios";
import {
  STAR_CLICKED,
  TOGGLE_REVIEW,
  GET_RATING_DETAILS,
  GET_ERRORS
} from "./types";

// This is an action creator for when a user likes a recipe
export const toggleReview = () => {
  return { type: TOGGLE_REVIEW };
};

export const submitReview = review => dispatch => {
  //get the user_id from the auth on backend form 'req.user'
  axios
    .post("/recipe-review", review)
    .then(() => {
      dispatch(toggleReview());
      dispatch(getRatingDetails(review.recipe_id));
    })
    .catch(err => console.log(err));
};

export const getRatingDetails = recipe_id => dispatch => {
  console.log("getRatingDetails");
  axios
    .get("/rating-details", { params: { recipe_id } })
    .then(res => {
      dispatch({ type: GET_RATING_DETAILS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
