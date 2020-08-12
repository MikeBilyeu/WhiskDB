import axios from "axios";
import {
  SAVE_RECIPE,
  GET_ERRORS,
  REMOVE_SAVED_RECIPES,
  GET_SAVED_RECIPES,
  REMOVE_RECIPES,
  GET_BROWSE_RECIPES,
  GET_RECIPE
} from "../types";

const unsaveRecipe = recipe_id => async (dispatch, getState) => {
  let savedRecipes = getState().savedRecipes.recipes.map(arr => ({ ...arr }));
  let browseRecipes = getState().browseRecipes.recipes.map(arr => ({ ...arr }));
  let recipe = { ...getState().recipe.recipe };

  // Update the data for saved and browse recipes

  --recipe.num_saves;
  recipe.saved = false;

  savedRecipes = savedRecipes.filter(
    recipe => recipe.recipe_id !== parseInt(recipe_id)
  );

  savedRecipes[0] && --savedRecipes[0].full_count;

  for (let i in browseRecipes) {
    if (browseRecipes[i].recipe_id === parseInt(recipe_id)) {
      browseRecipes[i].saved = false;
      --browseRecipes[i].num_saves;
    }
  }

  try {
    //dispatch({ type: SAVE_RECIPE });
    dispatch({ type: GET_RECIPE, payload: recipe });
    await axios.delete("/api/recipes/unsave", { params: { recipe_id } });

    dispatch({ type: REMOVE_SAVED_RECIPES });
    dispatch({ type: GET_SAVED_RECIPES, payload: savedRecipes });

    dispatch({ type: REMOVE_RECIPES });
    dispatch({
      type: GET_BROWSE_RECIPES,
      payload: browseRecipes
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default unsaveRecipe;
