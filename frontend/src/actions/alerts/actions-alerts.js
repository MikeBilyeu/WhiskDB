import { SHOW_ALERT, HIDE_ALERT } from "../types";

export const alert = (type, text) => dispatch => {
  dispatch({
    type: SHOW_ALERT,
    payload: { type, text }
  });

  setTimeout(() => {
    dispatch({ type: HIDE_ALERT });
  }, 3000);
};
