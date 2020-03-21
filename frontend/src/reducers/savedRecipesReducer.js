import {
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  REMOVE_SAVED_RECIPES
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_RECIPES_REQUEST:
      return { ...state, isFetching: true };
    case GET_SAVED_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
        isFetching: false
      };
    case REMOVE_SAVED_RECIPES:
      return { ...state, recipes: initialState.recipes };

    default:
      return state;
  }
}
