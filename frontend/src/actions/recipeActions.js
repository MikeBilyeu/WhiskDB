import axios from "axios";
import {
  GET_ERRORS,
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  SAVE_RECIPE,
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  GET_MY_RECIPES,
  GET_MY_RECIPES_REQUEST,
  TOGGLE_UNIT,
  CONVERT_SERVINGS,
  SORT_SAVED_RECIPES,
  TOGGLE_SORT_BUTTON,
  TOGGLE_SHARE,
  TOGGLE_EDIT_RECIPE
} from "./types";

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
    .catch(
      err => console.log(err)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

export const toggleEditRecipe = () => {
  return { type: TOGGLE_EDIT_RECIPE };
};

// Edit Recipe
export const submitEditRecipe = recipeData => dispatch => {
  axios
    .put("/profile/edit-recipe", recipeData)
    .then(res => {
      dispatch(toggleEditRecipe());
      dispatch(getRecipe(recipeData.recipe_id, recipeData.created_by));
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

export const getSavedRecipes = () => async dispatch => {
  dispatch({ type: GET_SAVED_RECIPES_REQUEST });
  try {
    const res = await axios.get("/save-recipe");
    dispatch({ type: GET_SAVED_RECIPES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const getMyRecipes = () => async dispatch => {
  dispatch({ type: GET_MY_RECIPES_REQUEST });
  try {
    const res = await axios.get("/my-recipe");
    dispatch({ type: GET_MY_RECIPES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const sortSavedRecipes = sortBy => dispatch => {
  dispatch({ type: SORT_SAVED_RECIPES, payload: sortBy });
  dispatch({ type: TOGGLE_SORT_BUTTON });
};

export const toggleSortButton = () => {
  return { type: TOGGLE_SORT_BUTTON };
};

export const saveRecipe = recipe_id => async dispatch => {
  try {
    dispatch({ type: SAVE_RECIPE });
    await axios.post("/save-recipe", { recipe_id });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const toggleUnit = unit => {
  return { type: TOGGLE_UNIT };
};

export const convertServings = number => {
  return { type: CONVERT_SERVINGS, payload: number };
};

export const toggleShare = () => {
  return { type: TOGGLE_SHARE };
};
