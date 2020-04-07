import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../private_route";
import { checkAuthToken } from "./utils";
import Nav from "../nav";
import Home from "../home";
import Profile from "../profile";
import Auth from "../auth";
import Recipe from "../recipe";
import ScrollUp from "./scroll_up";
import NoMatch from "../no_match";
import getSavedRecipes from "../../actions/recipe/get-saved-recipes";
import { getBrowseRecipes } from "../../actions/browse/get_recipes";

checkAuthToken();

const App = props => {
  useEffect(() => {
    if (props.isAuth) {
      props.getSavedRecipes();
    }
    props.getBrowseRecipes();
  }, [props.isAuth]);

  return (
    <Router>
      <ScrollUp>
        <Switch>
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/auth" component={Auth} />
          <Route exact path="/recipe/:recipe_id" component={Recipe} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NoMatch} />
        </Switch>
        <Nav />
      </ScrollUp>
    </Router>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getSavedRecipes, getBrowseRecipes }
)(App);
