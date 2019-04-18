import axios from "axios";
import {
  GET_ERRORS,
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  LIKED_RECIPE,
  DISLIKED_RECIPE,
  VOTE_CLICKED,
  SAVE_RECIPE,
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  TOGGLE_UNIT
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

// Save Recipe Action Creator
export const saveRecipe = (recipe_id, user_id) => dispatch => {
  console.log("Saved");
  if (user_id !== null) {
    dispatch({ type: SAVE_RECIPE });
    axios
      .post("/save-recipe", { user_id, recipe_id })
      .then(res => {
        console.log("User saved the recipe");
      })
      .catch(err => console.log(err));
  }
};

// This is an action creator for when a user likes a recipe
export const likeRecipe = (recipe_id, user_id) => dispatch => {
  const vote = "liked";
  dispatch({ type: VOTE_CLICKED });
  if (user_id !== null) {
    dispatch({ type: LIKED_RECIPE });
    console.log(recipe_id, user_id, vote);
    axios
      .post("/recipe/vote", { user_id, recipe_id, vote })
      .then(res => {
        console.log("User clicked the like button");
      })
      .catch(err => console.log(err));
  }
};

export const dislikeRecipe = (recipe_id, user_id) => dispatch => {
  const vote = "disliked";
  dispatch({ type: VOTE_CLICKED });
  if (user_id !== null) {
    dispatch({ type: DISLIKED_RECIPE });
    console.log(recipe_id, user_id, vote);
    axios
      .post("/recipe/vote", { user_id, recipe_id, vote })
      .then(res => {
        console.log("User clicked the disliked button");
      })
      .catch(err => console.log(err));
  }
};

export const toggleUnit = unit => {
  return { type: TOGGLE_UNIT, payload: unit };
};
