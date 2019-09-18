import React from "react";
import { connect } from "react-redux";

import Rating from "./recipe-display/rating/Rating";

import "./recipe-styles.css";

const RecipeDetails = ({
  recipe: { title, date_created, rating, votes, username },
  time
}) => {
  return (
    <div className="recipe-details">
      <h1 className="title">{title}</h1>
      <img
        href="recipe photo"
        alt=""
        src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      />
      <div className="username">-{username.toLowerCase()}</div>
      <Rating rating={rating} votes={votes} />
    </div>
  );
};

const mapStateToProps = state => {
  return { recipe: state.recipe.recipe };
};

export default connect(mapStateToProps)(RecipeDetails);
