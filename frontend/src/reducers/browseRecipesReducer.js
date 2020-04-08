import {
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON_BROWSE,
  OFFSET_INCREMENT,
  REMOVE_RECIPES,
  GET_USER
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true,
  filterRecipes: {
    search: "",
    category: "All Categories",
    diet: "None",
    sort: "Top Rated",
    offset: 0
  },
  activeFilterBtn: null
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

    case GET_USER:
      return {
        ...state,
        filterRecipes: { ...state.filterRecipes, diet: action.payload.diet }
      };

    case TOGGLE_FILTER_BUTTON_BROWSE:
      if (action.payload === state.activeFilterBtn) {
        return {
          ...state,
          activeFilterBtn: null
        };
      } else {
        return {
          ...state,
          activeFilterBtn: action.payload
        };
      }
    default:
      return state;
  }
}
