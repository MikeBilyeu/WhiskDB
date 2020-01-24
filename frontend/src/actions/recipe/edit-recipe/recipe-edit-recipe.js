import axios from "axios";
import { toggleEditRecipe, getRecipe } from "../actions-recipe";

// Edit Recipe
const submitEditRecipe = recipeData => dispatch => {
  axios.put("/profile/edit-recipe", recipeData).then(res => {
    dispatch(toggleEditRecipe());
    dispatch(getRecipe(recipeData.recipe_id, recipeData.created_by));
  });
};

export default submitEditRecipe;
