import {
  GET_POSTED_RECIPES,
  GET_POSTED_RECIPES_REQUEST
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTED_RECIPES_REQUEST:
      return { ...state, isFetching: true };
    case GET_POSTED_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
}
