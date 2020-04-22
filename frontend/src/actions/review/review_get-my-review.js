import axios from "axios";
import { GET_MY_RECIPE_REVIEW, GET_ERRORS } from "../types.js";

const getMyReview = recipe_id => async dispatch => {
  try {
    const myReview = await axios.get("/recipes/my-review", {
      params: { recipe_id }
    });
    if (myReview.data) {
      dispatch({ type: GET_MY_RECIPE_REVIEW, payload: myReview.data });
    }
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getMyReview;
