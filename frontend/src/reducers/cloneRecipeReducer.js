import { CLONE_RECIPE_START, CLONE_RECIPE_END } from "../actions/types";
const initialState = { fetching: false, msg: "", success: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case CLONE_RECIPE_START:
      return { fetching: true };
    case CLONE_RECIPE_END:
      return {
        fetching: false
      };

    default:
      return state;
  }
}
