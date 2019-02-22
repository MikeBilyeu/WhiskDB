import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import jwt_decode from "jwt-decode";
// import setAuthToken from "./utils/setAuthToken";
// import { setCurrentUser, logoutUser } from "./actions/authActions";

import Header from "./Header";
import NavigationBar from "./nav/NavigationBar";
import Home from "./browse/Home";
import Profile from "./profile/Profile";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Recipe from "./Recipe";

require("dotenv").config();

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
            <Route path="/profile/:page?" component={Profile} />
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
