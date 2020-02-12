import axios from "axios";
import { GET_RATING_DETAILS, GET_ERRORS } from "../../types";

const getRatingDetails = recipe_id => async dispatch => {
  try {
    const { data } = await axios.get("/rating-details", {
      params: { recipe_id }
    });
    dispatch({ type: GET_RATING_DETAILS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRatingDetails;
