import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SavedRecipes from "./SavedRecipes";
import MyRecipes from "./MyRecipes";
import Contact from "./Contact";
import EditProfile from "./EditProfile";
import Button from "../Button";
import EditNewRecipe from "./createRecipe/EditNewRecipe";
import PreviewNewRecipe from "./createRecipe/PreviewNewRecipe";

class Profile extends React.Component {
  render() {
    const { user } = this.props.auth;

    return (
      <Switch>
        <Route
          path="/profile/create-recipe/preview"
          component={PreviewNewRecipe}
        />
        <Route path="/profile/create-recipe" component={EditNewRecipe} />
        <Route path="/profile/edit" component={EditProfile} />
        <Route path="/profile/my-recipes" component={MyRecipes} />
        <Route path="/profile/SavedRecipes" component={SavedRecipes} />
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
                <div className="ui center aligned icon header">
                  <i className="user circle icon" />
                  <h2>{user.username}</h2>
                </div>

                <Button text="Create Recipe" linkTo="/profile/create-recipe" />
                <Button text="My Recipes" linkTo="/profile/my-recipes" />
                <Button text="Saved Recipes" linkTo="/profile/saved-recipes" />
                <Button text="Edit Profile" linkTo="/profile/edit" />
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
export default connect(
  mapStateToProps,
  {}
)(Profile);
