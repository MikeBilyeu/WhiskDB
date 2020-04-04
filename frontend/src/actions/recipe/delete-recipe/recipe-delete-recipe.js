import axios from "axios";

import { updateFilterRecipe } from "../../browse";
import { updateSavedFilterRecipe } from "../";

// Delete Recipe
const deleteRecipe = recipeId => dispatch => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.delete("/recipes/delete", { params: { recipeId } });

    if (res.status !== 200) {
      reject("Recipe delete error");
      return;
    }

    dispatch(updateSavedFilterRecipe("All Meals"));
    dispatch(updateFilterRecipe("meal", "All Meals"));

    resolve();
  });
};

export default deleteRecipe;
