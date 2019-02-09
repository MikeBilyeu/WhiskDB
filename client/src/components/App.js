import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

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

  // componentDidMount() {
  //   this.getDataFromDb();
  // }

  // getDataFromDb = () => {
  //   fetch("http://localhost:3001/api/getData")
  //     .then(data => data.json())
  //     .then(res => this.setState({ data: res.data }));
  // };

  render() {
    return (
      <Router>
        <div className="ui container">
          <Header />
          <Route
            exact
            path="/"
            component={() => (
              <Home onSubmit={this.props.onSubmit} data={this.state.data} />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/recipe" component={Recipe} />
          <NavigationBar />
        </div>
      </Router>
    );
  }
}

export default App;
