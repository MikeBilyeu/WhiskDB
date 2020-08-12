import axios from "axios";

import { updateFilterRecipe } from "../browse";
import { updateSavedFilterRecipe } from "./";

// Delete Recipe
const deleteRecipe = recipeId => dispatch => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.delete("/api/recipes/delete", {
      params: { recipeId }
    });

    if (res.status !== 200) {
      reject("Recipe delete error");
      return;
    }

    dispatch(updateSavedFilterRecipe("All Categories"));
    dispatch(updateFilterRecipe("category", "All Categories"));

    resolve();
  });
};

export default deleteRecipe;
