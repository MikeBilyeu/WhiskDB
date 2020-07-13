import {
  GET_RECIPE,
  GET_RECIPE_REQUEST,
  TOGGLE_REVIEW,
  SAVE_RECIPE,
  TOGGLE_UNIT,
  CONVERT_SERVINGS,
  GET_RATING_PERCENTAGE,
  GET_RATING,
  TOGGLE_SHOW_MORE,
  SUBMIT_REVIEW,
  GET_RECIPE_REVIEWS,
  GET_MY_RECIPE_REVIEW,
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
    star5: null,
    star4: null,
    star3: null,
    star2: null,
    star1: null
  },
  reviews: [],
  myReview: {},
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
        reviewOpen: false,
        editRecipe: false,
        showMoreOpen: false,
        convertedServings: action.payload.servings,
        ratingPercentage: {
          star5: 0,
          star4: 0,
          star3: 0,
          star2: 0,
          star1: 0
        },
        reviews: [],
        myReview: {},
        noMatch: false
      };
    case GET_RECIPE_REVIEWS:
      return { ...state, reviews: action.payload };
    case GET_MY_RECIPE_REVIEW:
      return { ...state, myReview: action.payload };
    case GET_RATING_PERCENTAGE:
      return { ...state, ratingPercentage: action.payload };
    case GET_RATING:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          rating: action.payload.rating,
          num_reviews: action.payload.num_reviews
        }
      };
    case SUBMIT_REVIEW:
      return { ...state, recipe: { ...state.recipe } };
    case SAVE_RECIPE:
      return {
        ...state,
        recipe: { ...state.recipe, saved: !state.recipe.saved }
      };
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
