import axios from "axios";

import {
  GET_ERRORS,
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA
} from "./types";

// dispatch an action witha type of get browse request
export const getBrowseRecipes = browseData => dispatch => {
  // this need a check so it doesn't dispatch undefined data
  if (browseData !== undefined) {
    dispatch({ type: SET_BROWSE_DATA, payload: browseData });
  }

  // dispatch a browse request
  dispatch({ type: GET_BROWSE_REQUEST });
  // make axios request
  axios
    .get("/browse-recipe", { params: { browseData } })
    .then(res => {
      dispatch({ type: GET_BROWSE_RECIPES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// export const setMealType = mealType => {
//   return { type: SET_MEALT_YPE, payload: mealType };
// };
