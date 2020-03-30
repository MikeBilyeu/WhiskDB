import axios from "axios";
import { change } from "redux-form";
import {
  TOGGLE_UNIT,
  CONVERT_SERVINGS,
  TOGGLE_SORT_BUTTON,
  GET_SCRAPE_URL_REQUEST,
  SET_PROFILE_FILTER_DATA,
  SAVED_OFFSET_INCREMENT,
  REMOVE_SAVED_RECIPES
} from "./types";

import { getSavedRecipes } from "./recipe";

// export const scrapeSite = URL => async dispatch => {
//   dispatch({ type: GET_SCRAPE_URL_REQUEST });
//   try {
//     const { data: recipe } = await axios.get("/scrape-url", {
//       params: { URL }
//     });
//     dispatch(change("newRecipe", "image_url", recipe.image_url));
//     dispatch(change("newRecipe", "title", recipe.title));
//     dispatch(change("newRecipe", "servings", recipe.servings));
//     dispatch(change("newRecipe", "ingredients", recipe.ingredients));
//     dispatch(change("newRecipe", "time", recipe.time));
//     dispatch(change("newRecipe", "directions", recipe.directions));
//     dispatch(change("newRecipe", "keywords", recipe.keywords));
//   } catch (err) {
//     console.error(err);
//   }
// };

export const incrementSavedOffset = () => dispatch => {
  dispatch({ type: SAVED_OFFSET_INCREMENT });
  dispatch(getSavedRecipes());
};

export const updateFilterRecipe = option => (dispatch, getState) => {
  // Remove recipes from previous request
  dispatch({ type: REMOVE_SAVED_RECIPES });

  dispatch({
    type: SET_PROFILE_FILTER_DATA,
    payload: { meal: option, offset: 0 }
  });
  dispatch(getSavedRecipes());
};

export const toggleSortButton = () => {
  return { type: TOGGLE_SORT_BUTTON };
};

export const toggleUnit = () => {
  return { type: TOGGLE_UNIT };
};

export const convertServings = number => {
  return { type: CONVERT_SERVINGS, payload: number };
};
