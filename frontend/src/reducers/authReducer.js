import {
  GET_USER,
  SET_CURRENT_USER,
  USER_LOADING,
  TOGGLE_DELETE,
  SET_PROFILE_FILTER_DATA,
  TOGGLE_FILTER_BUTTON_PROFILE,
  SAVED_OFFSET_INCREMENT,
  REMOVE_SAVED_RECIPES
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: { user_id: null, username: "", email: "" },
  loading: false,
  openDelete: false,
  filterRecipes: { category: "All Categories", offset: 0 },
  activeFilterBtn: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      if (Object.keys(action.payload).length !== 0) {
        return {
          ...state,
          isAuthenticated: true,
          user: { ...state.user, user_id: action.payload.user_id }
        };
      }
      return initialState;
    case SET_PROFILE_FILTER_DATA:
      return { ...state, filterRecipes: action.payload };
    case TOGGLE_FILTER_BUTTON_PROFILE:
      if (action.payload === state.activeFilterBtn) {
        return {
          ...state,
          activeFilterBtn: null
        };
      } else {
        return {
          ...state,
          activeFilterBtn: action.payload
        };
      }
    case SAVED_OFFSET_INCREMENT:
      return {
        ...state,
        filterRecipes: {
          ...state.filterRecipes,
          offset: state.filterRecipes.offset + 1
        }
      };
    case REMOVE_SAVED_RECIPES:
      return {
        ...state,
        filterRecipes: {
          ...state.filterRecipes,
          offset: 0
        }
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case TOGGLE_DELETE:
      return { ...state, openDelete: !state.openDelete };
    default:
      return state;
  }
}
