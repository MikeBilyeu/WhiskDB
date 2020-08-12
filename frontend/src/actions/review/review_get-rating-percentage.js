import axios from "axios";
import {
  GET_RATING_PERCENTAGE,
  GET_RATING,
  REMOVE_SAVED_RECIPES,
  GET_SAVED_RECIPES,
  REMOVE_RECIPES,
  GET_BROWSE_RECIPES,
  GET_ERRORS
} from "../types";

const getRatingPercentage = recipe_id => async (dispatch, getState) => {
  let savedRecipes = [...getState().savedRecipes.recipes];
  let browseRecipes = [...getState().browseRecipes.recipes];

  try {
    const { data } = await axios.get("/api/recipes/rating", {
      params: { recipe_id }
    });

    let ratingData = { num_reviews: data.num_reviews, rating: data.rating };

    delete data.rating;
    delete data.num_reviews;

    dispatch({ type: GET_RATING_PERCENTAGE, payload: data });

    dispatch({ type: GET_RATING, payload: ratingData });

    for (let i in browseRecipes) {
      if (browseRecipes[i].recipe_id === parseInt(recipe_id)) {
        browseRecipes[i].rating = ratingData.rating;
        browseRecipes[i].num_reviews = ratingData.num_reviews;
      }
    }

    const updateReviewData = recipes => {
      for (let i in recipes) {
        if (recipes[i].recipe_id === parseInt(recipe_id)) {
          recipes[i].rating = ratingData.rating;
          recipes[i].num_reviews = ratingData.num_reviews;
        }
      }
    };

    updateReviewData(browseRecipes);
    updateReviewData(savedRecipes);

    dispatch({ type: REMOVE_SAVED_RECIPES });
    dispatch({
      type: GET_SAVED_RECIPES,
      payload: savedRecipes
    });

    dispatch({ type: REMOVE_RECIPES });
    dispatch({
      type: GET_BROWSE_RECIPES,
      payload: browseRecipes
    });

    // must update the browse and saved recipes
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getRatingPercentage;
