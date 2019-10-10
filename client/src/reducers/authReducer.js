import {
  SET_CURRENT_USER,
  USER_LOADING,
  TOGGLE_DELETE
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  openDelete: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated:
          action.payload !== undefined &&
          Object.keys(action.payload).length !== 0,
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
