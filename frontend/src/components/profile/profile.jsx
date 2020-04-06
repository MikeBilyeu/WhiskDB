import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Edit from "./edit";
import CreateRecipe from "./create_recipe";
import Home from "./home";

const Profile = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/edit`} component={Edit} />
      <Route path={`${match.path}/create-recipe`} component={CreateRecipe} />
      <Route path={match.path} component={Home} />
    </Switch>
  );
};

export default Profile;
