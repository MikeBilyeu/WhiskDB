import axios from "axios";
import {
  GET_ERRORS,
  LIKED_RECIPE,
  DISLIKED_RECIPE,
  VOTE_CLICKED
} from "./types";

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
