import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

import PrivateRoute from "../private-route/PrivateRoute";
import store from "../store/store";

import NavigationBar from "./nav/NavigationBar";
import Home from "./browse/Home";
import Profile from "./profile/Profile";
import Auth from "./auth/Auth";
import Recipe from "./recipes/Recipe";
import ScrollToTop from "./ScrollToTop";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends React.Component {
  render() {
    return (
      <div style={{ paddingBottom: "4rem" }}>
        <Router>
          <ScrollToTop>
            <Route exact path="/" component={Home} />
            <Switch>
              <PrivateRoute path="/profile/:page?" component={Profile} />
              <Route path="/auth" component={Auth} />
              <Route path="/recipe/:recipe_id" component={Recipe} />
            </Switch>
            <NavigationBar />
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}

export default App;
