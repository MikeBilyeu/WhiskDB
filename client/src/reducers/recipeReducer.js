import {
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  LIKED_RECIPE,
  DISLIKED_RECIPE,
  VOTE_CLICKED,
  SAVE_RECIPE,
  TOGGLE_UNIT
} from "../actions/types";

const initialState = { recipe: {}, isFetching: true, unit: "US" };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE_REQUEST:
      return { ...state, isFetching: true };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        isFetching: false,
        saved: action.payload.saved,
        liked: action.payload.vote === "liked" ? true : false,
        disliked: action.payload.vote === "disliked" ? true : false
      };
    case SAVE_RECIPE:
      return { ...state, saved: !state.saved };
    case LIKED_RECIPE:
      return { ...state, liked: !state.liked, disliked: false };
    case DISLIKED_RECIPE:
      return { ...state, disliked: !state.disliked, liked: false };
    case VOTE_CLICKED:
      return { ...state, voteClicked: true };
    case TOGGLE_UNIT:
      return { ...state, unit: action.payload };

    default:
      return state;
  }
}
