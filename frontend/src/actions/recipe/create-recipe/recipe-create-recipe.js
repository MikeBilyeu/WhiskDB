import axios from "axios";
import { reset } from "redux-form";
import { imageUpload } from "../../recipe";

import {} from "../../types";

// Create Recipe
export const createRecipe = (recipeData, history) => async dispatch => {
  // CREATE_RECIPE_REQUEST

  try {
    let imageURL = await dispatch(imageUpload(recipeData.image));

    let res = await axios.post("/profile/create-recipe", {
      ...recipeData,
      image: imageURL
    });
    // CREATE_RECIPE_SUCCESS

    let recipe_id = res.data.recipe_id;

    // clear the recipe form after successful submit
    dispatch(reset("newRecipe"));

    // redirect to home after successful submit

    return history.push(`/recipe/${recipe_id}`);
  } catch (err) {
    // CREATE_RECIPE_FAILURE
    console.error(err);
  }
};

export default createRecipe;
