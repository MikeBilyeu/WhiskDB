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

const saveRecipe = recipe_id => async (dispatch, getState) => {
  let savedRecipes = getState().savedRecipes.recipes.map(arr => ({ ...arr }));
  let browseRecipes = getState().browseRecipes.recipes.map(arr => ({ ...arr }));
  let recipe = { ...getState().recipe.recipe };

  // Update the data for saved and browse recipes

  let fullCount = 1;
  if (savedRecipes[0]) {
    fullCount = ++savedRecipes[0].full_count;
  }

  ++recipe.num_saves;
  recipe.saved = true;

  savedRecipes = [
    {
      ...recipe,
      saved: true,
      full_count: fullCount
    },
    ...savedRecipes
  ];

  for (let i in browseRecipes) {
    if (browseRecipes[i].recipe_id === parseInt(recipe_id)) {
      browseRecipes[i].saved = true;
      ++browseRecipes[i].num_saves;
    }
  }

  try {
    //dispatch({ type: SAVE_RECIPE });
    dispatch({ type: GET_RECIPE, payload: recipe });
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
