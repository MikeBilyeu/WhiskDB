import axios from "axios";
import { GET_ERRORS, GET_RECIPE, GET_RECIPE_REQUEST } from "./types";

import { reset } from "redux-form";

// Create Recipe
export const createRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/profile/create-recipe", recipeData)
    .then(res => {
      //clear the recipe form after successful submit
      dispatch(reset("newRecipe"));
      let recipe_id = res.data.recipe_id;
      // redirect to home after successful submit
      return history.push(`/recipe/${recipe_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getRecipe = recipe_id => dispatch => {
  dispatch({ type: GET_RECIPE_REQUEST });
  axios
    .get("/recipe", { params: recipe_id })
    .then(res => {
      dispatch({ type: GET_RECIPE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
