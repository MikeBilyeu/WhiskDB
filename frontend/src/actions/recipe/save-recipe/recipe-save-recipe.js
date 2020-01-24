import axios from "axios";
import { SAVE_RECIPE, GET_ERRORS } from "../../types";

const saveRecipe = recipe_id => async dispatch => {
  try {
    dispatch({ type: SAVE_RECIPE });
    await axios.post("/save-recipe", { recipe_id });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default saveRecipe;
