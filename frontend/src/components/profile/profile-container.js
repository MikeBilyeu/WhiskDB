import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getMyRecipes,
  getSavedRecipes,
  toggleSortButton,
  createRecipe
} from "../../actions/recipeActions";
import { getUser } from "../../actions/auth";
import Header from "./header";
import RecipeContainer from "./recipes";
import SortBy from "./SortBy";
import SortButton from "../sort-button";
import Edit from "./edit";
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

  handlePageClick = page => {
    this.setState(prevState => {
      if (prevState.page !== page) {
        return { page };
      }
    });
  };

  render() {
    const page = this.state.page;
    const username = this.props.auth.user.username.toLowerCase();
    const { full_name } = this.props.auth.user;

    const {
      sortActive,
      sortBy,
      recipes: savedRecipes
    } = this.props.savedRecipes;
    const { recipes: myRecipes } = this.props.myRecipes;

    return (
      <Switch>
        <Route path="/profile/edit" component={Edit} />
        <Route path="/profile/create-recipe" component={CreateRecipe} />
        <Route
          component={() => {
            return (
              <div className="profile">
                <Header
                  username={username}
                  fullName={full_name}
                  page={page}
                  onPageClick={this.handlePageClick}
                />
                {page === "saved" ? (
                  <RecipeContainer recipes={savedRecipes}>
                    {sortActive && <SortBy />}
                  </RecipeContainer>
                ) : (
                  <RecipeContainer recipes={myRecipes} />
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
  auth: state.auth,
  savedRecipes: state.savedRecipes,
  myRecipes: state.myRecipes
});
export default withRouter(
  connect(
    mapStateToProps,
    { getUser, getMyRecipes, getSavedRecipes, toggleSortButton, createRecipe }
  )(Profile)
);
