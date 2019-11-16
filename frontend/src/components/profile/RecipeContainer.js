import React from "react";
import PropTypes from "prop-types";
import RecipeDisplayMini from "../recipe-display/RecipeDisplayMini";

const RecipeContainer = props => {
  const renderRecipeList = () => {
    // pass this in as a prop an map over prop
    return props.recipes.map((recipe, i) => {
      return <RecipeDisplayMini key={recipe.title + i} recipe={recipe} />;
    });
  };

  return (
    <div>
      {props.children}
      <h3 style={{ textAlign: "center" }}>{props.containerName}</h3>
      <ul className="profile-recipes">{renderRecipeList()}</ul>
    </div>
  );
};

RecipeContainer.propTypes = {
  containerName: PropTypes.string.isRequired,
  recipes: PropTypes.array.isRequired,
  children: PropTypes.any.isRequired
};

export default RecipeContainer;
