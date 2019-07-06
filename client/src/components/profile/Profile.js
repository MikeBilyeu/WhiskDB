import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./profile-styles.css";

import SavedRecipes from "./saved-recipes/SavedRecipes";
import MyRecipes from "./MyRecipes";
import Contact from "./Contact";
import EditProfile from "./EditProfile";
import Button from "./Button";
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
              <div className="profile">
                <div className="profile-header">
                  <h1>{this.props.username}</h1>
                  <Link to="/profile/edit" className="profile-edit">
                    Edit Profile
                  </Link>
                </div>
                <Button text="Create Recipe" linkTo="/profile/create-recipe" />
                <Button text="My Recipes" linkTo="/profile/my-recipes" />
                <Button text="Contact Us" linkTo="/profile/contact" />
              </div>
            );
          }}
        />
      </Switch>
    );
  }
}

// Profile.propTypes = {
//   auth: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({
  username: state.auth.user.username
});
export default connect(mapStateToProps)(Profile);
