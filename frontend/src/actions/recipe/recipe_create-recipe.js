import axios from "axios";
import { reset } from "redux-form";
import imageUpload from "../image";
import { updateSavedFilterRecipe } from "../recipe";

// Create Recipe
const createRecipe = (recipeForm, history) => dispatch => {
  return new Promise(async (resolve, reject) => {
    let imageURL = await dispatch(imageUpload(recipeForm.imageFile));

    if (!imageURL) {
      reject("Image upload error");
      return;
    }

    let res = await axios.post("/recipes/create", {
      ...recipeForm,
      image_url: imageURL
    });

    if (res.status !== 200) {
      reject("Recipe upload error");
      return;
    }

    let recipe_id = res.data.recipe_id;

    // clear the recipe form after successful submit
    dispatch(reset("create-recipe"));
    // redirect to recipe after successful submit
    history.push(`/recipe/${recipe_id}`);
    dispatch(updateSavedFilterRecipe("All Categories"));
    resolve();
  });
};

export default createRecipe;
