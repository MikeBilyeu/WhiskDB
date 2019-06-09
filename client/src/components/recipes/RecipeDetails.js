import React from "react";
import { connect } from "react-redux";

import Rating from "./recipe-display/rating/Rating";

import "./recipe-styles.css";

const RecipeDetails = ({
  recipe: { title, date_created, rating, votes, username },
  time
}) => {
  console.log(time);
  return (
    <div className="recipe-details">
      <h1 className="title">{title}</h1>
      <div className="time">Time: {time}</div>
      <Rating rating={rating} votes={votes} />
      <div className="username">{username}</div>
      <div className="date">{date_created}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return { recipe: state.recipe.recipe };
};

export default connect(mapStateToProps)(RecipeDetails);
