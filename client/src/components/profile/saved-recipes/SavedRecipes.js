import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SortBy from "./SortBy";
import { Loading } from "../../loading/Loading";
import RecipeDisplay from "../../recipes/recipe-display/RecipeDisplay";
import { ReactComponent as Arrow } from "./filterArrow.svg";

import "./sr-styles.css";
// action Creator
import { getSavedRecipes } from "../../../actions/recipeActions";

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
      return <RecipeDisplay key={i} recipe={recipe} />;
    });
  };

  handleClick = () => {
    this.setState(prevState => {
      return { sortActive: !prevState.sortActive };
    });
  };

  render() {
    const { recipes, isFetching } = this.props.savedRecipes;

    let arrowStyle = {};

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        <div
          className={
            "sr-header" + (this.state.sortActive ? " remove-btm-border" : "")
          }
        >
          <h1>Saved Recipes</h1>
          <div className="header-btn" onClick={this.handleClick}>
            <div>Sort</div>
            <Arrow
              className={
                "arrowStyle" + (this.state.sortActive ? " sortActive" : "")
              }
            />
          </div>
          {this.state.sortActive ? <SortBy /> : null}
        </div>
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
  { getSavedRecipes }
)(SavedRecipes);
