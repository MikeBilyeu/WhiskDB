import {
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  TOGGLE_REVIEW,
  SAVE_RECIPE,
  TOGGLE_UNIT,
  CONVERT_SERVINGS,
  GET_RATING_DETAILS,
  TOGGLE_SHARE,
  SUBMIT_REVIEW,
  TOGGLE_EDIT_RECIPE
} from "../actions/types";

const initialState = {
  recipe: {},
  isFetching: true,
  unit: "US",
  reviewOpen: false,
  shareOpen: false,
  editRecipe: false,
  ratingDetails: {
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0,
    num_reviews: 0,
    rating: 0
  }
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
        convertedServings: action.payload.servings,
        ratingDetails: {
          star5: 0,
          star4: 0,
          star3: 0,
          star2: 0,
          star1: 0,
          rating: action.payload.rating,
          num_reviews: action.payload.num_reviews
        }
      };
    case GET_RATING_DETAILS:
      return { ...state, ratingDetails: action.payload };
    case SUBMIT_REVIEW:
      return { ...state, recipe: { ...state.recipe } };
    case SAVE_RECIPE:
      return { ...state, saved: !state.saved };
    case TOGGLE_REVIEW:
      return { ...state, reviewOpen: !state.reviewOpen };
    case TOGGLE_SHARE:
      return { ...state, shareOpen: !state.shareOpen };
    case TOGGLE_UNIT:
      return { ...state, unit: state.unit === "US" ? "Metric" : "US" };
    case CONVERT_SERVINGS:
      return { ...state, convertedServings: action.payload };
    case TOGGLE_EDIT_RECIPE:
      return { ...state, editRecipe: !state.editRecipe };
    default:
      return state;
  }
}
