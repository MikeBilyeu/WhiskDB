import {
  GET_BROWSE_RECIPES,
  GET_BROWSE_REQUEST,
  SET_BROWSE_DATA
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true,
  browseData: { search: "", mealType: "Breakfast", diet: [], cuisine: [] }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BROWSE_REQUEST:
      return { ...state, isFetching: true };
    case GET_BROWSE_RECIPES:
      return { ...state, recipes: action.payload, isFetching: false };
    case SET_BROWSE_DATA:
      return { ...state, browseData: action.payload };
    default:
      return state;
  }
}
