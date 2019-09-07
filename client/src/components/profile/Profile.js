import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./profile-styles.css";

import SavedRecipes from "./saved-recipes/SavedRecipes";
import MyRecipes from "./MyRecipes";
import EditProfile from "./EditProfile";
import CreateRecipe from "./createRecipe/CreateRecipe";
import Button from "./Button";
import { ReactComponent as UserIcon } from "../../images/userProfile.svg";
import { ReactComponent as WhiskIcon } from "../../images/WhiskIcon.svg";

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
        <Route path="/profile/create-recipe" component={CreateRecipe} />
        <Route
          component={() => {
            return (
              <div className="profile">
                <div
                  style={{
                    display: "grid",
                    placeItems: "cetner",
                    backgroundColor: "#FFF",
                    position: "fixed",
                    width: "100%",
                    height: "2.1rem"
                  }}
                >
                  <WhiskIcon
                    style={{
                      width: "5rem",
                      margin: ".2rem auto"
                    }}
                  />
                </div>
                <div className="profile-header">
                  <Link
                    style={{
                      padding: ".5rem",
                      display: "grid",
                      placeItems: "center"
                    }}
                    to="/profile/edit"
                    className="profile-edit"
                  >
                    <UserIcon style={{ width: "3.5rem" }} />
                    <div
                      style={{
                        color: "#0172C4",
                        fontSize: "1rem",
                        margin: ".3rem"
                      }}
                    >
                      Edit
                    </div>
                  </Link>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "100",
                      margin: 0,
                      marginBottom: "1rem",
                      color: "#FFF"
                    }}
                  >
                    @{this.props.username.toLowerCase()}
                  </h2>
                </div>
                <div className="s-mr-toggle">
                  <div
                    onClick={() => {
                      this.setState({ savedComponent: true });
                    }}
                    className={
                      "authButton " +
                      (this.state.savedComponent ? "active" : "")
                    }
                  >
                    Saved
                  </div>
                  <div
                    onClick={() => {
                      this.setState({ savedComponent: false });
                    }}
                    className={
                      "authButton " +
                      (!this.state.savedComponent ? "active" : "")
                    }
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
