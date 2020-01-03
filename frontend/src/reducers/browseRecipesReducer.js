import {
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON,
  OFFSET_INCREMENT,
  REMOVE_RECIPES
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true,
  filterRecipes: {
    search: "",
    meal: "All Meals",
    diet: "None",
    sort: "Top Rated",
    offset: 0
  },
  toggleFilterButton: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BROWSE_REQUEST:
      return { ...state, isFetching: true };
    case GET_BROWSE_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
        isFetching: false
      };
    case SET_BROWSE_DATA:
      return {
        ...state,
        filterRecipes: { ...state.filterRecipes, ...action.payload }
      };
    case REMOVE_RECIPES:
      return {
        ...state,
        recipes: initialState.recipes
      };
    case OFFSET_INCREMENT:
      return {
        ...state,
        filterRecipes: {
          ...state.filterRecipes,
          offset: state.filterRecipes.offset + 1
        }
      };

    case TOGGLE_FILTER_BUTTON:
      if (action.payload === state.toggleFilterButton) {
        return {
          ...state,
          toggleFilterButton: null
        };
      } else {
        return {
          ...state,
          toggleFilterButton: action.payload
        };
      }
    default:
      return state;
  }
}
