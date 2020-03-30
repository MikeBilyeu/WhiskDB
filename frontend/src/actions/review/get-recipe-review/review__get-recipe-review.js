import axios from "axios";
import { GET_RECIPE_REVIEW, GET_ERRORS } from "../../types.js";

const getRecipeReview = recipe_id => async dispatch => {
  try {
    const { data } = await axios.get("/recipes/review", {
      params: { recipe_id }
    });
    if (data) {
      dispatch({ type: GET_RECIPE_REVIEW, payload: data });
    }
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRecipeReview;
