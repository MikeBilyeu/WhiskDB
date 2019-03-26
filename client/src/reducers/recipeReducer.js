import {
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  LIKED_RECIPE,
  DISLIKED_RECIPE,
  VOTE_CLICKED
} from "../actions/types";

const initialState = { recipe: {}, isFetching: true };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE_REQUEST:
      return { ...state, isFetching: true };
    case GET_RECIPE:
      return { ...state, recipe: action.payload, isFetching: false };
    case LIKED_RECIPE:
      return { ...state, liked: !state.liked, disliked: false };
    case DISLIKED_RECIPE:
      return { ...state, disliked: !state.disliked, liked: false };
    case VOTE_CLICKED:
      return { ...state, voteClicked: true };

    default:
      return state;
  }
}
