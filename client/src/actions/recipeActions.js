import axios from "axios";
import {
  GET_ERRORS,
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  SAVE_RECIPE,
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  TOGGLE_UNIT,
  CONVERT_SERVINGS,
  SORT_SAVED_RECIPES
} from "./types";

import { reset } from "redux-form";

// Create Recipe
export const createRecipe = (recipeData, history) => dispatch => {
  console.log(recipeData, history);
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

export const getRecipe = (recipe_id, user_id) => dispatch => {
  dispatch({ type: GET_RECIPE_REQUEST });
  axios
    .get("/recipe", { params: { recipe_id, user_id } })
    .then(res => {
      dispatch({ type: GET_RECIPE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const getSavedRecipes = user_id => dispatch => {
  dispatch({ type: GET_SAVED_RECIPES_REQUEST });

  axios
    .get("/save-recipe", { params: { user_id } })
    .then(res => {
      dispatch({ type: GET_SAVED_RECIPES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const sortSavedRecipes = sortBy => {
  return { type: SORT_SAVED_RECIPES, payload: sortBy };
};

// Save Recipe Action Creator
export const saveRecipe = (recipe_id, user_id) => dispatch => {
  if (user_id !== null) {
    dispatch({ type: SAVE_RECIPE });
    axios
      .post("/save-recipe", { user_id, recipe_id })
      .then(res => {})
      .catch(err => console.log(err));
  }
};

export const toggleUnit = unit => {
  return { type: TOGGLE_UNIT, payload: unit };
};

export const convertServings = number => {
  return { type: CONVERT_SERVINGS, payload: number };
};
