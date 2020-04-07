import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";
import { USER_LOGOUT } from "../../types";

const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  // Remove token from auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({ type: USER_LOGOUT });
};

export default logoutUser;
