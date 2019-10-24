import React from "react";
import { connect } from "react-redux";

import SortBy from "./SortBy";
import { Loading } from "../../loading/Loading";
import { SortButton } from "../../sort-button/SortButton";
import RecipeDisplayMini from "../../recipes/recipe-display/RecipeDisplayMini";

import "./sr-styles.css";
// action Creator
import {
  getSavedRecipes,
  toggleSortButton
} from "../../../actions/recipeActions";

class SavedRecipes extends React.Component {
  componentDidMount() {
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getSavedRecipes(user_id);
  }

  renderRecipeList = () => {
    return this.props.savedRecipes.recipes.map((recipe, i) => {
      return <RecipeDisplayMini key={i} recipe={recipe} />;
    });
  };

  render() {
    const { isFetching, sortActive, sortBy } = this.props.savedRecipes;

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        {sortActive ? <SortBy /> : null}
        <div className={"sr-header" + (sortActive ? " remove-btm-border" : "")}>
          <SortButton
            onClick={this.props.toggleSortButton}
            sortActive={sortActive}
            sortBy={sortBy}
          />
        </div>
        <h3 style={{ textAlign: "center" }}>Saved Recipes</h3>

        <ul className="saved-recipes">{this.renderRecipeList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  savedRecipes: state.savedRecipes
});

export default connect(
  mapStateToProps,
  { getSavedRecipes, toggleSortButton }
)(SavedRecipes);
