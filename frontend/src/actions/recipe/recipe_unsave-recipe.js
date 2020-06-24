import axios from "axios";
import {
  SAVE_RECIPE,
  GET_ERRORS,
  REMOVE_SAVED_RECIPES,
  GET_SAVED_RECIPES
} from "../types";

const unsaveRecipe = recipe_id => async (dispatch, getState) => {
  let {
    savedRecipes: { recipes: savedRecipes },
    browseRecipes: { recipes: browseRecipes }
  } = getState();
  // Update the data for saved and browse recipes
  let fullCount = 0;

  let updatedRecipes = savedRecipes.filter(recipe => {
    return recipe.recipe_id !== parseInt(recipe_id);
  });

  if (updatedRecipes[0]) {
    fullCount = parseInt(savedRecipes[0].full_count) - 1;
    updatedRecipes[0].full_count = fullCount;
  }

  for (let i in browseRecipes) {
    if (browseRecipes[i].recipe_id === parseInt(recipe_id)) {
      browseRecipes[i].saved = false;
      browseRecipes[i].num_saves = browseRecipes[i].num_saves - 1;
    }
  }

  try {
    dispatch({ type: SAVE_RECIPE });
    await axios.delete("/recipes/unsave", { params: { recipe_id } });
    dispatch({ type: REMOVE_SAVED_RECIPES });
    dispatch({ type: GET_SAVED_RECIPES, payload: updatedRecipes });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default unsaveRecipe;
