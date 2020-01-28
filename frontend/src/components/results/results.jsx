import React from "react";
import PropTypes from "prop-types";
import Loading from "../recipe_display/loading";
import RecipeDisplay from "../recipe_display";
import Button from "../button";
import NoResults from "../home/no_results";

import "./results.scss";

class Results extends React.PureComponent {
  renderRecipeList = () => {
    return this.props.recipes.map((recipe, i) => {
      return <RecipeDisplay key={recipe.recipe_id} recipe={recipe} />;
    });
  };

  renderRecipeListLoading = () => {
    // Display 6 loading placeholders
    let recipeListLoading = [];
    for (let i = 0; i <= 5; i++) {
      recipeListLoading.push(<Loading />);
    }
    return recipeListLoading;
  };

  render() {
    if (this.props.isFetching) {
      return (
        <div
          className={`recipe-results ${this.props.filterOptionsOpened &&
            "active"}`}
        >
          <ul>{this.renderRecipeListLoading()}</ul>
        </div>
      );
    }
    if (this.props.recipes.length < 1) {
      return <NoResults />;
    }

    return (
      <div
        className={`recipe-results ${this.props.filterOptionsOpened &&
          "active"}`}
      >
        <ul>{this.renderRecipeList()}</ul>
        {this.props.recipes.length < this.props.recipes[0].full_count ? (
          <Button className="btn load-more" onClick={this.props.handleClick}>
            Load More
          </Button>
        ) : null}
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
