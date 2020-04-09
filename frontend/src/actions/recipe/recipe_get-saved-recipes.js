import axios from "axios";
import {
  GET_ERRORS,
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  TOGGLE_FILTER_BUTTON_PROFILE,
  SET_PROFILE_FILTER_DATA
} from "../types";

const getSavedRecipes = () => async (dispatch, getState) => {
  const {
    auth: { filterRecipes }
  } = getState();

  dispatch({ type: GET_SAVED_RECIPES_REQUEST });
  dispatch({ type: TOGGLE_FILTER_BUTTON_PROFILE, payload: null });
  dispatch({ type: SET_PROFILE_FILTER_DATA, payload: filterRecipes });

  try {
    const res = await axios.get("/recipes/saved", { params: filterRecipes });
    dispatch({ type: GET_SAVED_RECIPES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export default getSavedRecipes;
