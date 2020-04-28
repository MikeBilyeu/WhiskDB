import { SHOW_ALERT, HIDE_ALERT } from "../actions/types";
const initialState = { visible: false, text: "", status: "" };

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        visible: true,
        type: action.payload.type,
        text: action.payload.text
      };
    case HIDE_ALERT:
      return { visible: false, text: "", type: "" };

    default:
      return state;
  }
}
