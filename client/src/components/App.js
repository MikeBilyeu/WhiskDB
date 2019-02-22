import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

import PrivateRoute from "../private-route/PrivateRoute";
import store from "../store/store";

import Header from "./Header";
import NavigationBar from "./nav/NavigationBar";
import Home from "./browse/Home";
import Profile from "./profile/Profile";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Recipe from "./Recipe";

require("dotenv").config();

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
  state = { data: [] };

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div style={{ padding: "6rem 2rem 5rem 2rem" }}>
            <Route
              exact
              path="/"
              component={() => (
                <Home onSubmit={this.props.onSubmit} data={this.state.data} />
              )}
            />
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/recipe" component={Recipe} />
          </div>
          <NavigationBar />
        </div>
      </Router>
    );
  }
}

export default App;
