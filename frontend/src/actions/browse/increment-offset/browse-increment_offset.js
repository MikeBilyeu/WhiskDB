import { OFFSET_INCREMENT } from "../../types";
import { getBrowseRecipes, getSearchRecipes } from "../get_recipes";

const incrementOffset = () => (dispatch, getState) => {
  const {
    browseRecipes: { filterRecipes }
  } = getState();

  if (filterRecipes.search) {
    dispatch({ type: OFFSET_INCREMENT });
    dispatch(getSearchRecipes(filterRecipes));
  } else {
    dispatch({ type: OFFSET_INCREMENT });
    dispatch(getBrowseRecipes());
  }
};

export default incrementOffset;
