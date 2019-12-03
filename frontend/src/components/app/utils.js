import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../store";
import { setCurrentUser, logoutUser } from "../../actions/auth";

export const checkAuthToken = () => {
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(token));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (jwt_decode(token).exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./auth";
    }
  }
};
