import {
  GET_USER,
  SET_CURRENT_USER,
  USER_LOADING,
  TOGGLE_DELETE,
  SET_PROFILE_FILTER_DATA,
  TOGGLE_FILTER_BUTTON_PROFILE
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: { user_id: null, username: "", full_name: "", email: "" },
  loading: false,
  openDelete: false,
  filterRecipes: { meal: "All Meals" },
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
      if (action.payload === state.activeFilterBtn)
        return {
          ...state,
          activeFilterBtn: null
        };
      else {
        return {
          ...state,
          activeFilterBtn: action.payload
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
