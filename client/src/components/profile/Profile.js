import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./profile-styles.css";

import SavedRecipes from "./saved-recipes/SavedRecipes";
import MyRecipes from "./MyRecipes";
import EditProfile from "./EditProfile";
import Button from "./Button";

class Profile extends React.Component {
  //add state to toggle saved / my recipes
  constructor(props) {
    super(props);
    this.state = {
      savedComponent: true
    };
  }

  render() {
    return (
      <Switch>
        <Route path="/profile/edit" component={EditProfile} />
        <Route
          component={() => {
            return (
              <div className="profile">
                <div className="profile-header">
                  <Link to="/profile/edit" className="profile-edit">
                    Edit Profile
                  </Link>
                  <h2>First Last</h2>
                  <h2>@{this.props.username}</h2>
                </div>
                <div className="s-mr-toggle">
                  <div
                    onClick={() => {
                      this.setState({ savedComponent: true });
                    }}
                  >
                    Saved
                  </div>
                  <div
                    onClick={() => {
                      this.setState({ savedComponent: false });
                    }}
                  >
                    My Recipes
                  </div>
                </div>
                <div>
                  {this.state.savedComponent ? <SavedRecipes /> : <MyRecipes />}
                </div>
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
