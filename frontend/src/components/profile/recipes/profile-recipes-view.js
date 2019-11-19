import React from "react";
import PropTypes from "prop-types";
import RecipeDisplay from "../../recipe-display";

const RecipeContainer = props => {
  const renderRecipeList = () => {
    // pass this in as a prop an map over prop
    return props.recipes.map((recipe, i) => {
      return <RecipeDisplay key={recipe.title + i} recipe={recipe} />;
    });
  };

  return (
    <div className="profile-recipes">
      {props.children}
      <ul>{renderRecipeList()}</ul>
    </div>
  );
};

RecipeContainer.propTypes = {
  containerName: PropTypes.string.isRequired,
  recipes: PropTypes.array.isRequired,
  children: PropTypes.any.isRequired
};

export default RecipeContainer;
