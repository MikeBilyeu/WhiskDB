import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getMyRecipes,
  getSavedRecipes,
  toggleSortButton
} from "../../actions/recipeActions";
import { getUser } from "../../actions/authActions";
import Header from "./header";
import RecipeContainer from "./RecipeContainer";
import SortBy from "./SortBy";
import SortButton from "../sort-button";
import EditProfile from "./edit-profile";
import CreateRecipe from "./create-recipe";
import "./profile.scss";

class Profile extends React.Component {
  //add state to toggle saved / my recipes
  constructor(props) {
    super(props);
    this.state = {
      page: "saved"
    };
  }

  componentDidMount() {
    this.props.getUser();
    const user_id =
      this.props.auth.isAuthenticated && this.props.auth.user.user_id;
    this.props.getMyRecipes(user_id);
    this.props.getSavedRecipes(user_id);
  }

  handleClick = page => {
    this.setState({ page });
  };

  render() {
    const page = this.state.page;
    const username = this.props.username.toLowerCase();
    const {
      sortActive,
      sortBy,
      recipes: savedRecipes
    } = this.props.savedRecipes;
    const { recipes: myRecipes } = this.props.myRecipes;

    return (
      <Switch>
        <Route path="/profile/edit" component={EditProfile} />
        <Route path="/profile/create-recipe" component={CreateRecipe} />
        <Route
          component={() => {
            return (
              <div className="profile">
                <Header
                  page={page}
                  onClick={this.handleClick}
                  username={username}
                />
                <div>
                  {page === "saved" ? (
                    <RecipeContainer
                      recipes={savedRecipes}
                      containerName="Saved Recipes"
                    >
                      {sortActive && <SortBy />}
                      <div
                        className={
                          "sr-header" + (sortActive ? " remove-btm-border" : "")
                        }
                      >
                        <SortButton
                          onClick={this.props.toggleSortButton}
                          sortActive={sortActive}
                          sortBy={sortBy}
                        />
                      </div>
                    </RecipeContainer>
                  ) : (
                    <RecipeContainer
                      recipes={myRecipes}
                      containerName="My Recipes"
                    >
                      <Link to="/profile/create-recipe">
                        <div className="create-recipe-btn">Create Recipe</div>
                      </Link>
                    </RecipeContainer>
                  )}
                </div>
              </div>
            );
          }}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userData.user.username,
  auth: state.auth,
  savedRecipes: state.savedRecipes,
  myRecipes: state.myRecipes
});
export default connect(
  mapStateToProps,
  { getUser, getMyRecipes, getSavedRecipes, toggleSortButton }
)(Profile);
