import axios from "axios";
import { GET_RATING_PERCENTAGE, GET_ERRORS } from "../types";

const getRatingPercentage = recipe_id => async dispatch => {
  try {
    const { data } = await axios.get("/recipes/rating", {
      params: { recipe_id }
    });
    dispatch({ type: GET_RATING_PERCENTAGE, payload: data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRatingPercentage;
