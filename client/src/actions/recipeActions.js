import axios from "axios";
import { CREATE_RECIPE, GET_ERRORS } from "./types";

// Create Recipe
export const createRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/profile/create-recipe", recipeData)
    .then(res => history.push("/profile")) // re-direct to profile on successful create recipe
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
