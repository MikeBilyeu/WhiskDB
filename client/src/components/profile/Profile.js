import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CreateRecipe from "./createRecipe/CreateRecipe";
import SavedRecipes from "./SavedRecipes";
import MyRecipes from "./MyRecipes";
import Contact from "../Contact";
import EditProfile from "./EditProfile";
import Button from "../Button";

import PropTypes from "prop-types";

class Profile extends React.Component {
  render() {
    const { user } = this.props.auth;

    const page = this.props.match.params.page;
    const path = this.props.match.url;
    switch (page) {
      case "create-recipe":
        return <Route path={path} component={CreateRecipe} />;
      case "my-recipes":
        return <Route path={path} component={MyRecipes} />;
      case "saved-recipes":
        return <Route path={path} component={SavedRecipes} />;
      case "edit":
        return <Route path={path} component={EditProfile} />;
      case "contact":
        return <Route path={this.props.match.url} component={Contact} />;
      default:
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
              <h2>{user.name}</h2>
            </div>

            <Button text="Create Recipe" linkTo="/profile/create-recipe" />
            <Button text="My Recipes" linkTo="/profile/my-recipes" />
            <Button text="Saved Recipes" linkTo="/profile/saved-recipes" />
            <Button text="Edit Profile" linkTo="/profile/edit" />
            <Button text="Contact Us" linkTo="/profile/contact" />
          </div>
        );
    }
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
