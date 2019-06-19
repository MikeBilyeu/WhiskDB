import {
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA,
  TOGGLE_FILTER_BUTTON,
  SET_CURRENT_USER
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true,
  browseData: {
    user_id: null,
    search: "",
    meal: "All Meals",
    diet: "None",
    cuisine: "All Cuisines",
    sort: "Top Rated"
  },
  toggleFilterButton: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        browseData: { ...state.browseData, user_id: action.payload.user_id }
      };
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
