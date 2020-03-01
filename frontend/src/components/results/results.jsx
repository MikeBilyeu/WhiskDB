import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Loading from "../recipe_card/loading";
import RecipeCard from "../recipe_card";
import NoResults from "./no_results";
import "./results.scss";

const Results = props => {
  const renderRecipeList = () => {
    return props.recipes.map((recipe, i) => {
      return <RecipeCard key={recipe.recipe_id} recipe={recipe} />;
    });
  };

  const renderRecipeListLoading = () => {
    let recipeListLoading = [];
    for (let i = 0; i < 8; i++) {
      recipeListLoading.push(<Loading key={i} />);
    }
    return recipeListLoading;
  };

  if (!props.recipes.length && !props.isFetching) {
    return <NoResults />;
  }

  if (props.recipes.length) {
    return (
      <div
        className={classNames("recipe-results", {
          "recipe-results--active": props.filterOptionsOpened
        })}
      >
        <ul className="recipe-results__list">
          {renderRecipeList()}
          {props.isFetching && renderRecipeListLoading()}
        </ul>
        {props.recipes.length < props.recipes[0].full_count ? (
          <button
            className="recipe-results__load-more"
            onClick={props.handleClick}
          >
            Load More
          </button>
        ) : null}
      </div>
    );
  }

  return null;
};

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  filterOptionsOpened: PropTypes.bool.isRequired
};

export default Results;
