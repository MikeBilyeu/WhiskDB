import axios from "axios";
import {
  SAVE_RECIPE,
  GET_ERRORS,
  REMOVE_SAVED_RECIPES,
  GET_SAVED_RECIPES
} from "../../types";

const saveRecipe = recipe_id => async (dispatch, getState) => {
  const {
    savedRecipes: { recipes },
    recipe: { recipe }
  } = getState();

  let fullCount = 0;

  if (recipes[0]) {
    fullCount = parseInt(recipes[0].full_count) + 1;
  }

  try {
    dispatch({ type: SAVE_RECIPE });
    await axios.post("/recipes/save", { recipe_id });
    dispatch({ type: REMOVE_SAVED_RECIPES });
    dispatch({
      type: GET_SAVED_RECIPES,
      payload: [{ ...recipe, full_count: fullCount }, ...recipes]
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default saveRecipe;
