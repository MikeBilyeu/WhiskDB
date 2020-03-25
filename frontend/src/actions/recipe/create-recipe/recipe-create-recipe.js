import axios from "axios";
import { reset } from "redux-form";
import imageUpload from "../../image";

// Create Recipe
export const createRecipe = (recipeData, history) => async dispatch => {
  try {
    let imageURL = await dispatch(imageUpload(recipeData.imageFile));

    let res = await axios.post("/profile/create-recipe", {
      ...recipeData,
      image_url: imageURL
    });

    let recipe_id = res.data.recipe_id;

    // clear the recipe form after successful submit
    dispatch(reset("create-recipe"));

    // redirect to home after successful submit
    return history.push(`/recipe/${recipe_id}`);
  } catch (err) {
    console.error(err);
  }
};

export default createRecipe;
