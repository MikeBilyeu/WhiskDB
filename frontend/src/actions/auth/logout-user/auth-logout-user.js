import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";

const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  // Remove token from auth header for future requests
  setAuthToken(false);
  // Set current user to empty string which will set isAuthenticated to false
  dispatch(setCurrentUser(""));
};

export default logoutUser;
