import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../auth";

const googleLogin = token => dispatch => {
  localStorage.setItem("jwtToken", token);
  // Add token to auth header for future requests
  setAuthToken(token);
  const decodedToken = jwt_decode(token);
  dispatch(setCurrentUser(decodedToken));
};

export default googleLogin;
