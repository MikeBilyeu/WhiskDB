import axios from "axios";
import { change, reset } from "redux-form";
import { CLONE_RECIPE_START, CLONE_RECIPE_END } from "../types";
import { alert } from "../alerts";

const scrapeSite = url => async dispatch => {
  dispatch({ type: CLONE_RECIPE_START });

  try {
    const { data: recipe } = await axios.get("/recipes/create/scrape", {
      params: { url }
    });

    dispatch(reset("create-recipe"));

    dispatch(change("create-recipe", "image_url", recipe.image_url));
    let imgData = new FormData();
    imgData.append("file", recipe.image_url);
    imgData.append("upload_preset", "recipes");
    dispatch(change("create-recipe", "imageFile", imgData));
    dispatch(change("create-recipe", "title", recipe.title));
    dispatch(change("create-recipe", "servings", recipe.servings));
    dispatch(change("create-recipe", "ingredients", recipe.ingredients));
    dispatch(change("create-recipe", "time", recipe.time));
    dispatch(change("create-recipe", "directions", recipe.directions));
    dispatch(change("create-recipe", "keywords", recipe.keywords));

    if (!recipe.ingredients && !recipe.directions) {
      throw Error("Couldn't copy recipe.");
    }

    dispatch(alert("success", "Recipe Copied!"));
    dispatch({ type: CLONE_RECIPE_END });
  } catch (err) {
    console.error(err);

    dispatch({ type: CLONE_RECIPE_END });
    dispatch(alert("warning", "Sorry, couldn't copy recipe."));
    dispatch(reset("create-recipe"));
  }
};

export default scrapeSite;
