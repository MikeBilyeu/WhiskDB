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
import PageToggle from "./page-toggle";
import RecipeContainer from "./recipes";
import SortBy from "./SortBy";
import SortButton from "../sort-button";
import Edit from "./edit";
import RecipeUpsert from "../recipe-upsert";
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
    const username = this.props.userData.username.toLowerCase();
    const { full_name } = this.props.userData;
    const {
      sortActive,
      sortBy,
      recipes: savedRecipes
    } = this.props.savedRecipes;
    const { recipes: myRecipes } = this.props.myRecipes;

    return (
      <Switch>
        <Route path="/profile/edit" component={Edit} />
        <Route path="/profile/create-recipe" component={RecipeUpsert} />
        <Route
          component={() => {
            return (
              <div className="profile">
                <Header username={username} fullName={full_name} />
                <PageToggle
                  page={page}
                  onClick={this.handleClick}
                  numRecipesSaved={savedRecipes.length}
                  numRecipesPosted={myRecipes.length}
                />
                {page === "saved" ? (
                  <RecipeContainer recipes={savedRecipes}>
                    {sortActive && <SortBy />}
                  </RecipeContainer>
                ) : (
                  <RecipeContainer recipes={myRecipes}>
                    <Link to="/profile/create-recipe">
                      <div className="create-recipe-btn">Create Recipe</div>
                    </Link>
                  </RecipeContainer>
                )}
              </div>
            );
          }}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData.user,
  auth: state.auth,
  savedRecipes: state.savedRecipes,
  myRecipes: state.myRecipes
});
export default connect(
  mapStateToProps,
  { getUser, getMyRecipes, getSavedRecipes, toggleSortButton }
)(Profile);
