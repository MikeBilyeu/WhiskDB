import React from "react";
import { connect } from "react-redux";

import SortBy from "./SortBy";
import { Loading } from "../../loading/Loading";
import { Button } from "../../Button";
import RecipeDisplayMini from "../../recipes/recipe-display/RecipeDisplayMini";
import { ReactComponent as SortIcon } from "../../../images/SortIcon.svg";

import "./sr-styles.css";
// action Creator
import {
  getSavedRecipes,
  toggleSortButton
} from "../../../actions/recipeActions";

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortActive: false
    };
  }

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

  handleClick = () => {
    this.props.toggleSortButton();
  };

  abbreviateSortBy = sortBy => {
    // return shorter text for disply under the sortIcon button
    switch (sortBy) {
      case "date saved":
        return "Saved";
      case "top rated":
        return "Rated";
      case "time":
        return "Time";
      default:
        return sortBy.toUpperCase();
    }
  };

  render() {
    const { isFetching, toggleSortButton, sortBy } = this.props.savedRecipes;

    const abbreviatedSortBy = this.abbreviateSortBy(sortBy);

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        {toggleSortButton ? <SortBy /> : null}
        <div
          className={
            "sr-header" + (toggleSortButton ? " remove-btm-border" : "")
          }
        >
          <Button
            onClick={this.handleClick}
            className={"arrowStyle" + (toggleSortButton ? " sortActive" : "")}
          >
            <SortIcon
              style={{
                fill: toggleSortButton === "Sort" ? "#0172C4" : "#676767"
              }}
              className="sort-icon"
            />
            {abbreviatedSortBy}
          </Button>
        </div>
        <h3 style={{ textAlign: "center" }}>Saved Recipes</h3>

        <ul className="saved-recipes">{this.renderRecipeList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  savedRecipes: state.savedRecipes,
  sort: state.savedRecipes.sortBy
});

export default connect(
  mapStateToProps,
  { getSavedRecipes, toggleSortButton }
)(SavedRecipes);
