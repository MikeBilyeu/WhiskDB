import {
  GET_SAVED_RECIPES,
  GET_SAVED_RECIPES_REQUEST,
  SORT_SAVED_RECIPES,
  TOGGLE_SORT_BUTTON
} from "../actions/types";

const initialState = {
  recipes: [],
  isFetching: true,
  sortBy: "Date Saved",
  sortActive: false
};

// return a sort function
const sortRecipes = sortBy => {
  switch (sortBy) {
    case "time":
      return (a, b) => {
        return a.total_time_mins - b.total_time_mins;
      };
    case "a-z":
      return (a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return titleA < titleB ? -1 : 1;
      };

    case "top rated":
      return (a, b) => {
        if (b.rating - a.rating === 0) {
          return b.votes - a.votes;
        }
        return b.rating - a.rating;
      };
    case "date saved":
      return (a, b) => {
        return new Date(b.saved_date) - new Date(a.saved_date);
      };

    default:
      break;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_RECIPES_REQUEST:
      return { ...state, isFetching: true };
    case GET_SAVED_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        isFetching: false
      };
    case SORT_SAVED_RECIPES:
      return {
        ...state,
        sortBy: action.payload,
        recipes: state.recipes.sort(sortRecipes(action.payload))
      };
    case TOGGLE_SORT_BUTTON:
      return {
        ...state,
        sortActive: !state.sortActive
      };

    default:
      return state;
  }
}
