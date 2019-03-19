import { GET_RECIPE, GET_RECIPE_REQUEST } from "../actions/types";

const initialState = { recipe: {}, isFetching: true };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE_REQUEST:
      return { ...state, isFetching: true };
    case GET_RECIPE:
      return { ...state, recipe: action.payload, isFetching: false };
    default:
      return state;
  }
}
