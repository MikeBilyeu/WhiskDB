import {
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  STAR_CLICKED,
  TOGGLE_REVIEW,
  SAVE_RECIPE,
  TOGGLE_UNIT,
  CONVERT_SERVINGS
} from "../actions/types";

const initialState = {
  recipe: {},
  isFetching: true,
  unit: "US",
  reviewOpen: false
};

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
        convertedServings: action.payload.servings
      };
    case SAVE_RECIPE:
      return { ...state, saved: !state.saved };
    case TOGGLE_REVIEW:
      return { ...state, reviewOpen: !state.reviewOpen };
    case TOGGLE_UNIT:
      return { ...state, unit: state.unit === "US" ? "Metric" : "US" };
    case CONVERT_SERVINGS:
      return { ...state, convertedServings: action.payload };

    default:
      return state;
  }
}
