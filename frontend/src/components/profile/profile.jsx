import React from "react";
import { Route, Switch } from "react-router-dom";
import Edit from "./edit";
import CreateRecipe from "./create_recipe";
import Home from "./home";

const Profile = () => {
  return (
    <Switch>
      <Route path="/profile/edit" component={Edit} />
      <Route path="/profile/create-recipe" component={CreateRecipe} />
      <Route path="/profile" component={Home} />
    </Switch>
  );
};

export default Profile;
