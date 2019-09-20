import axios from "axios";
import { STAR_CLICKED, TOGGLE_REVIEW } from "./types";

// This is an action creator for when a user likes a recipe
export const toggleReview = () => {
  return { type: TOGGLE_REVIEW };
};

export const submitReview = review => dispatch => {
  // dispatch(toggleReview());
  //get the user_id from the auth on backend form 'req.user'
  console.log(review);
  axios
    .post("/recipe-review", review)
    .then(() => {
      dispatch(toggleReview());
    })
    .catch(err => console.log(err));
};
