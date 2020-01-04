import React from "react";
import PropTypes from "prop-types";
import Loading from "../loading";
import RecipeDisplay from "../recipe-display";
import Button from "../button";
import NoResults from "../home/no-results";

import "./results.scss";

class Results extends React.PureComponent {
  renderRecipeList = () => {
    return this.props.recipes.map((recipe, i) => {
      return <RecipeDisplay key={recipe.recipe_id} recipe={recipe} />;
    });
  };

  render() {
    if (this.props.isFetching) {
      return <Loading />;
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
        <Button className="btn load-more" onClick={this.props.handleClick}>
          Load More
        </Button>
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
