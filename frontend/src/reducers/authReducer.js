import {
  GET_USER,
  SET_CURRENT_USER,
  USER_LOADING,
  TOGGLE_DELETE,
  SET_PROFILE_FILTER_DATA,
  TOGGLE_FILTER_BUTTON
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: { user_id: null, username: "", full_name: "", email: "" },
  loading: false,
  openDelete: false,
  filterRecipes: { meal: "All Meals" },
  toggleFilterButton: null
};
//state.browseRecipes.toggleFilterButton
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
    case TOGGLE_FILTER_BUTTON:
      if (action.payload === state.toggleFilterButton)
        return {
          ...state,
          toggleFilterButton: null
        };
      else {
        return {
          ...state,
          toggleFilterButton: action.payload
        };
      }
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
