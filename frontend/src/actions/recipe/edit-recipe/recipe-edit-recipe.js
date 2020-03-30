import axios from "axios";
import { toggleEditRecipe, getRecipe } from "../actions-recipe";
import imageUpload from "../../image";

// Edit Recipe
const submitEditRecipe = recipeData => async dispatch => {
  try {
    let imageURL = recipeData.image_url;

    if (recipeData.imageFile) {
      imageURL = await dispatch(imageUpload(recipeData.imageFile));
    }

    await axios.put("/recipes/edit", {
      ...recipeData,
      image_url: imageURL
    });

    dispatch(toggleEditRecipe());
    dispatch(getRecipe(recipeData.recipe_id, recipeData.created_by));
  } catch (err) {
    console.error(err);
  }
};

export default submitEditRecipe;
