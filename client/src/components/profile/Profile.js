import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SavedRecipes from "./saved-recipes/SavedRecipes";
import MyRecipes from "./MyRecipes";
import Contact from "./Contact";
import EditProfile from "./EditProfile";
import Button from "../Button";
import EditNewRecipe from "./createRecipe/editRecipe/EditNewRecipe";

class Profile extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/profile/create-recipe" component={EditNewRecipe} />
        <Route path="/profile/edit" component={EditProfile} />
        <Route path="/profile/my-recipes" component={MyRecipes} />
        <Route path="/profile/saved-recipes" component={SavedRecipes} />
        <Route path="/profile/contact" component={Contact} />
        <Route
          component={() => {
            return (
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  gridGap: "2rem"
                }}
              >
                <h1>Profile</h1>
                <Button text="Edit Profile" linkTo="/profile/edit" />
                <Button text="My Recipes" linkTo="/profile/my-recipes" />
                <Button text="Create Recipe" linkTo="/profile/create-recipe" />
                <Button text="Saved Recipes" linkTo="/profile/saved-recipes" />
                <Button text="Contact Us" linkTo="/profile/contact" />
              </div>
            );
          }}
        />
      </Switch>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Profile);
