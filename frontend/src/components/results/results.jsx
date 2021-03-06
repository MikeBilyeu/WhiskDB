import React, { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Loading from "../recipe_card/loading";
import RecipeCard from "../recipe_card";
import NoResults from "./no_results";
import "./results.scss";

const Results = props => {
  const options = {};

  let observer = new IntersectionObserver((entries, oberver) => {
    if (entries[0].isIntersecting) {
      props.handleClick();
    }
  }, options);

  const ref = useCallback(node => {
    if (node !== null) {
      observer.observe(node);
    }
  }, []);

  const renderRecipeList = () => {
    return props.recipes.map((recipe, i) => {
      return <RecipeCard key={recipe.recipe_id} recipe={recipe} />;
    });
  };

  const renderRecipeListLoading = () => {
    let recipeListLoading = [];
    for (let i = 0; i < 9; i++) {
      recipeListLoading.push(<Loading key={i} />);
    }
    return recipeListLoading;
  };

  if (!props.recipes.length && !props.isFetching) {
    return <NoResults />;
  } else {
    return (
      <div
        className={classNames("recipe-results", {
          "recipe-results--active": props.filterOptionsOpened
        })}
      >
        <ul className="recipe-results__list">
          {props.recipes.length > 0 && renderRecipeList()}
          {props.isFetching && renderRecipeListLoading()}
        </ul>

        {!props.isFetching &&
        props.recipes.length < props.recipes[0].full_count ? (
          <button
            ref={ref}
            onClick={props.handleClick}
            className="recipe-results__load-more"
          >
            Load More
          </button>
        ) : null}
      </div>
    );
  }
};

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  filterOptionsOpened: PropTypes.bool
};

export default Results;
