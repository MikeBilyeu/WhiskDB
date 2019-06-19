import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SaveIcon } from "./SaveIcon.svg";

import Rating from "./rating/Rating";

import "./rd-styles.css";

const RecipeDisplay = props => {
  const { title, votes, rating, recipe_id } = props.recipe;

  return (
    <li className="recipe-card">
      <h3 className="recipe-username">MikeBilyeu</h3>
      <SaveIcon className="SaveIcon" />
      <img
        className="thumbnail"
        src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      />

      <div className="title">{title}</div>

      <Rating className="rating" rating={rating} votes={votes} />
      <Link className="view" to={`/recipe/${recipe_id}`}>
        View Recipe
      </Link>
    </li>
  );
};
//
export default RecipeDisplay;
