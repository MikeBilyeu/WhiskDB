import {
  GET_USER,
  SET_CURRENT_USER,
  USER_LOADING,
  TOGGLE_DELETE
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: { user_id: null, username: "", full_name: "", email: "" },
  loading: false,
  openDelete: false
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
