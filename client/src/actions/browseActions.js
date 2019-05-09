import axios from "axios";

import { GET_ERRORS, GET_BROWSE_RECIPES, GET_BROWSE_REQUEST } from "./types";

// dispatch an action witha type of get browse request
export const getBrowseRecipes = browseData => dispatch => {
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
