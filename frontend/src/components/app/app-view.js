import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./private-route/PrivateRoute";
import { checkAuthToken } from "./utils";

// Components
import NavigationBar from "../nav/NavigationBar";
import Home from "../home";
import Profile from "../profile/Profile";
import Auth from "../auth/Auth";
import Recipe from "../recipes/Recipe";
import ScrollUp from "./scroll-up";

checkAuthToken();

const App = () => {
  return (
    <div className="paddingBottom">
      <Router>
        <ScrollUp>
          <Route exact path="/" component={Home} />
          <Switch>
            <PrivateRoute path="/profile/:page?" component={Profile} />
            <Route path="/auth" component={Auth} />
            <Route path="/recipe/:recipe_id" component={Recipe} />
          </Switch>
          <NavigationBar />
        </ScrollUp>
      </Router>
    </div>
  );
};

export default App;
