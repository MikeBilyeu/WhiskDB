import {
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  SORT_SAVED_RECIPES
} from "../actions/types";

const initialState = { recipes: [], isFetching: true, sortBy: "date saved" };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_RECIPES_REQUEST:
      return { ...state, isFetching: true };
    case GET_SAVED_RECIPES:
      return { ...state, recipes: action.payload, isFetching: false };
    case SORT_SAVED_RECIPES:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}
