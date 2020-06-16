import axios from "axios";
import { GET_RECIPE_REQUEST, GET_RECIPE, GET_ERRORS, NO_MATCH } from "../types";

const getRecipe = (recipe_id, user_id) => async (dispatch, getState) => {
  dispatch({ type: GET_RECIPE_REQUEST });
  const {
    browseRecipes: { recipes: browseRecipes },
    savedRecipes: { recipes: savedRecipes }
  } = getState();

  let recipe = [...savedRecipes, ...browseRecipes].find(
    recipe => recipe.recipe_id === parseInt(recipe_id)
  );
  try {
    if (!recipe) {
      const { data } = await axios.get("/recipes/recipe", {
        params: { recipe_id, user_id }
      });
      dispatch({ type: GET_RECIPE, payload: data });
    } else {
      dispatch({ type: GET_RECIPE, payload: recipe });
    }
  } catch (err) {
    // if (err.response.status === 404) {
    //   dispatch({ type: NO_MATCH });
    // }
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRecipe;
