import {
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true,
  browseData: {
    search: "",
    meal: "Breakfast",
    diet: "None",
    cuisine: "All",
    sort: "A-Z"
  },
  toggleDiet: false,
  toggleCuisine: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BROWSE_REQUEST:
      return { ...state, isFetching: true };
    case GET_BROWSE_RECIPES:
      return { ...state, recipes: action.payload, isFetching: false };
    case SET_BROWSE_DATA:
      return { ...state, browseData: action.payload };
    case TOGGLE_FILTER_BUTTON:
      if (action.payload === "Diet")
        return {
          ...state,
          toggleDiet: !state.toggleDiet,
          toggleCuisine: false,
          toggleSort: false
        };
      else if (action.payload === "Cuisine") {
        return {
          ...state,
          toggleDiet: false,
          toggleCuisine: !state.toggleCuisine,
          toggleSort: false
        };
      } else if (action.payload === "Sort") {
        return {
          ...state,
          toggleDiet: false,
          toggleCuisine: false,
          toggleSort: !state.toggleSort
        };
      }
    default:
      return state;
  }
}
