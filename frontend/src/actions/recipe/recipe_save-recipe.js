import axios from "axios";
import {
  SAVE_RECIPE,
  GET_ERRORS,
  REMOVE_SAVED_RECIPES,
  GET_SAVED_RECIPES,
  REMOVE_RECIPES,
  GET_BROWSE_RECIPES
} from "../types";

const saveRecipe = recipe_id => async (dispatch, getState) => {
  let savedRecipes = [...getState().savedRecipes.recipes];
  let browseRecipes = [...getState().browseRecipes.recipes];
  let recipe = { ...getState().recipe.recipe };

  // Update the data for saved and browse recipes
  let fullCount = 0;
  if (savedRecipes[0]) {
    fullCount = savedRecipes[0].full_count + 1;
  }

  savedRecipes = [
    {
      ...recipe,
      saved: true,
      num_saves: recipe.num_saves + 1,
      full_count: fullCount
    },
    ...savedRecipes
  ];

  for (let i in browseRecipes) {
    if (browseRecipes[i].recipe_id === parseInt(recipe_id)) {
      browseRecipes[i].saved = true;
      browseRecipes[i].num_saves = browseRecipes[i].num_saves + 1;
    }
  }

  try {
    dispatch({ type: SAVE_RECIPE });
    await axios.post("/recipes/save", { recipe_id });

    dispatch({ type: REMOVE_SAVED_RECIPES });
    dispatch({
      type: GET_SAVED_RECIPES,
      payload: savedRecipes
    });

    dispatch({ type: REMOVE_RECIPES });
    dispatch({
      type: GET_BROWSE_RECIPES,
      payload: browseRecipes
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default saveRecipe;
