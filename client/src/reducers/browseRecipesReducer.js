import { GET_BROWSE_RECIPES, GET_BROWSE_REQUEST } from "../actions/types";

const initialState = { recipes: [], isFetching: true };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BROWSE_REQUEST:
      return { ...state, isFetching: true };
    case GET_BROWSE_RECIPES:
      return { ...state, recipes: action.payload, isFetching: false };
    default:
      return state;
  }
}
