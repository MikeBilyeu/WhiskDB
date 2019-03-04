import axios from "axios";
import { GET_ERRORS } from "./types";
import { reset } from "redux-form";

// Create Recipe
export const createRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/profile/create-recipe", recipeData)
    .then(res => {
      //clear the recipe form after successful submit
      // dispatch(reset("newRecipe"));
      // redirect to home after successful submit
      // return history.push("/");
    }) // re-direct to profile on successful create recipe
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
