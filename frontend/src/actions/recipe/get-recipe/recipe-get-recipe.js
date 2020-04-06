import axios from "axios";
import { GET_RECIPE_REQUEST, GET_RECIPE, GET_ERRORS } from "../../types";

const getRecipe = (recipe_id, user_id) => async dispatch => {
  try {
    dispatch({ type: GET_RECIPE_REQUEST });
    const res = await axios.get("/recipes/recipe", {
      params: { recipe_id, user_id }
    });

    dispatch({ type: GET_RECIPE, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRecipe;
