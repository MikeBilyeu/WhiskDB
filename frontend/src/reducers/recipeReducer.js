import {
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  TOGGLE_REVIEW,
  SAVE_RECIPE,
  TOGGLE_UNIT,
  CONVERT_SERVINGS,
  GET_RATING_PERCENTAGE,
  TOGGLE_SHOW_MORE,
  SUBMIT_REVIEW,
  GET_RECIPE_REVIEW,
  TOGGLE_EDIT_RECIPE,
  NO_MATCH
} from "../actions/types";

const initialState = {
  recipe: {},
  isFetching: true,
  unit: "US",
  reviewOpen: false,
  showMoreOpen: false,
  editRecipe: false,
  ratingPercentage: {
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0,
    num_reviews: 0,
    rating: 0
  },
  review: null,
  noMatch: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE_REQUEST:
      return { ...state, isFetching: true, noMatch: false };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        isFetching: false,
        saved: action.payload.saved,
        reviewOpen: false,
        editRecipe: false,
        showMoreOpen: false,
        convertedServings: action.payload.servings,
        ratingPercentage: {
          star5: 0,
          star4: 0,
          star3: 0,
          star2: 0,
          star1: 0,
          rating: action.payload.rating,
          num_reviews: action.payload.num_reviews
        },
        review: null,
        noMatch: false
      };
    case GET_RECIPE_REVIEW:
      return { ...state, review: action.payload };
    case GET_RATING_PERCENTAGE:
      return { ...state, ratingPercentage: action.payload };
    case SUBMIT_REVIEW:
      return { ...state, recipe: { ...state.recipe } };
    case SAVE_RECIPE:
      return { ...state, saved: !state.saved };
    case TOGGLE_REVIEW:
      return { ...state, reviewOpen: !state.reviewOpen };
    case TOGGLE_SHOW_MORE:
      return { ...state, showMoreOpen: !state.showMoreOpen };
    case TOGGLE_UNIT:
      return { ...state, unit: state.unit === "US" ? "Metric" : "US" };
    case CONVERT_SERVINGS:
      return { ...state, convertedServings: action.payload };
    case TOGGLE_EDIT_RECIPE:
      return { ...state, editRecipe: !state.editRecipe };
    case NO_MATCH:
      return { ...initialState, noMatch: true };
    default:
      return state;
  }
}
