import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import NavigationBar from "./NavigationBar";
import Home from "./Home";
import Profile from "./Profile";
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

  // onSearchSubmit(term) {
  //   axios
  //     .get("https://api.edamam.com/search", {
  //       params: {
  //         q: term,
  //         app_id: process.env.REACT_APP_APP_ID,
  //         app_key: process.env.REACT_APP_APP_KEY
  //       }
  //     })
  //     .then(function(response) {
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

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
