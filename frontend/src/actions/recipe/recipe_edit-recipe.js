import axios from "axios";
import { toggleEditRecipe, getRecipe } from "./";
import imageUpload from "../image";

// Edit Recipe
const submitEditRecipe = recipeData => dispatch => {
  return new Promise(async (resolve, reject) => {
    let imageURL = recipeData.image_url;

    if (recipeData.imageFile) {
      imageURL = await dispatch(imageUpload(recipeData.imageFile));
      if (!imageURL) reject("Image upload error");
    }

    let res = await axios.put("/recipes/edit", {
      ...recipeData,
      image_url: imageURL
    });
    if (res.status !== 200) reject("Recipe upload error");

    dispatch(toggleEditRecipe());
    dispatch(getRecipe(recipeData.recipe_id, recipeData.created_by));
    resolve();
  });
};

export default submitEditRecipe;
