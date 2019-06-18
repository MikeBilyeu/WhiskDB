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
    sort: "Top Rated"
  },
  toggleFilterButton: null
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
      if (action.payload === state.toggleFilterButton)
        return {
          ...state,
          toggleFilterButton: null
        };
      else {
        return {
          ...state,
          toggleFilterButton: action.payload
        };
      }
    default:
      return state;
  }
}
