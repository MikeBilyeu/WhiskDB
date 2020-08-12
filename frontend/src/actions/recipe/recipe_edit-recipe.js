import axios from "axios";
import { REMOVE_SAVED_RECIPES, REMOVE_RECIPES } from "../types";
import { toggleEditRecipe, getRecipe, getSavedRecipes } from "./";
import { getBrowseRecipes } from "../browse";
import imageUpload from "../image";

// Edit Recipe
const submitEditRecipe = recipeData => (dispatch, getState) => {
  const {
    auth: {
      user: { user_id }
    }
  } = getState();

  return new Promise(async (resolve, reject) => {
    let imageURL = recipeData.image_url;

    if (recipeData.imageFile) {
      imageURL = await dispatch(imageUpload(recipeData.imageFile));
      if (!imageURL) reject("Image upload error");
    }

    let res = await axios.put("/api/recipes/edit", {
      ...recipeData,
      image_url: imageURL
    });
    if (res.status !== 200) reject("Recipe upload error");

    dispatch(toggleEditRecipe());
    dispatch({ type: REMOVE_SAVED_RECIPES });
    dispatch({ type: REMOVE_RECIPES });
    dispatch(getRecipe(recipeData.recipe_id, user_id));
    dispatch(getSavedRecipes());
    dispatch(getBrowseRecipes());
    resolve();
  });
};

export default submitEditRecipe;
