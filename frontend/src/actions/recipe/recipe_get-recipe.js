import axios from "axios";
import { GET_RECIPE_REQUEST, GET_RECIPE, GET_ERRORS, NO_MATCH } from "../types";

const getRecipe = (recipe_id, user_id) => async dispatch => {
  try {
    dispatch({ type: GET_RECIPE_REQUEST });
    const res = await axios.get("/recipes/recipe", {
      params: { recipe_id, user_id }
    });

    dispatch({ type: GET_RECIPE, payload: res.data });
  } catch (err) {
    if (err.response.status === 404) {
      dispatch({ type: NO_MATCH });
    }
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRecipe;
