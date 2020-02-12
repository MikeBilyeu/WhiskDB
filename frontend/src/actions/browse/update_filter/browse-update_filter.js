import { SET_BROWSE_DATA, REMOVE_RECIPES } from "../../types";
import { getBrowseRecipes, getSearchRecipes } from "../get_recipes";

const updateFilterRecipe = (type, value) => (dispatch, getState) => {
  // Remove recipes from previous request
  dispatch({ type: REMOVE_RECIPES });

  if (type === "search") {
    dispatch({
      type: SET_BROWSE_DATA,
      payload: { [type]: value, offset: 0, meal: "All Meals" }
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
