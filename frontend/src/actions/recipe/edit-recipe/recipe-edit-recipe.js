import axios from "axios";
import { toggleEditRecipe, getRecipe } from "../actions-recipe";
import imageUpload from "../../image";

// Edit Recipe
const submitEditRecipe = recipeData => async dispatch => {
  try {
    let imageURL = await dispatch(imageUpload(recipeData.imageFile));

    await axios.put("/profile/edit-recipe", {
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
