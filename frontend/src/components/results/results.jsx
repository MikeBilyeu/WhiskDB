import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Loading from "../recipe_card/loading";
import RecipeCard from "../recipe_card";
import NoResults from "./no_results";

import "./results.scss";

class Results extends React.PureComponent {
  renderRecipeList = () => {
    return this.props.recipes.map((recipe, i) => {
      return <RecipeCard key={recipe.recipe_id} recipe={recipe} />;
    });
  };

  renderRecipeListLoading = () => {
    let recipeListLoading = [];
    for (let i = 0; i < 8; i++) {
      recipeListLoading.push(<Loading key={i} />);
    }
    return recipeListLoading;
  };

  render() {
    if (this.props.recipes.length < 1 && !this.props.isFetching) {
      return <NoResults />;
    }

    return (
      <div
        className={classNames("recipe-results", {
          "recipe-results--active": this.props.filterOptionsOpened
        })}
      >
        {this.props.isFetching ? (
          <ul className="recipe-results__list">
            {this.renderRecipeListLoading()}
          </ul>
        ) : (
          <>
            <ul className="recipe-results__list">{this.renderRecipeList()}</ul>
            {this.props.recipes.length < this.props.recipes[0].full_count ? (
              <button
                className="recipe-results__load-more"
                onClick={this.props.handleClick}
              >
                Load More
              </button>
            ) : null}
          </>
        )}
      </div>
    );
  }
}

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  filterOptionsOpened: PropTypes.bool.isRequired
};

export default Results;
