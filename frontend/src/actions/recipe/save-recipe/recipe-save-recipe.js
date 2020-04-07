import axios from "axios";
import { SAVE_RECIPE, GET_ERRORS, REMOVE_SAVED_RECIPES } from "../../types";
import getSavedRecipes from "../get-saved-recipes";

const saveRecipe = recipe_id => async dispatch => {
  try {
    dispatch({ type: SAVE_RECIPE });
    await axios.post("/recipes/save", { recipe_id });
    dispatch({ type: REMOVE_SAVED_RECIPES });
    dispatch(getSavedRecipes());
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default saveRecipe;
