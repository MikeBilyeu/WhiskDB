import { SET_BROWSE_DATA, REMOVE_RECIPES } from "../../types";
import { getBrowseRecipes, getSearchRecipes } from "../get_recipes";

const updateFilterRecipe = (type, value) => (dispatch, getState) => {
  const {
    browseRecipes: { filterRecipes }
  } = getState();

  // Remove recipes from previous request
  dispatch({ type: REMOVE_RECIPES });

  if (type === "search" || (filterRecipes.search && type === "sort")) {
    dispatch({
      type: SET_BROWSE_DATA,
      payload: { [type]: value, offset: 0, category: "All Categories" }
    });
    dispatch(getSearchRecipes());
  } else {
    dispatch({
      type: SET_BROWSE_DATA,
      payload: { [type]: value, offset: 0, search: "" }
    });
    dispatch(getBrowseRecipes());
  }
};

export default updateFilterRecipe;
