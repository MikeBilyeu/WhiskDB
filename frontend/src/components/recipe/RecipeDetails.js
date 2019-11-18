import React from "react";
import { connect } from "react-redux";
import { toggleReview } from "../../actions/rateActions";
import Rating from "./rating";

const RecipeDetails = ({
  recipe: {
    recipe: { title, date_created, username },
    ratingDetails: { rating, num_reviews }
  },
  time,
  toggleReview
}) => {
  return (
    <div className="recipe-details">
      <h1 className="title">{title}</h1>
      <div className="username">-{username.toLowerCase()}</div>
      <Rating onClick={toggleReview} rating={rating} votes={num_reviews} />
    </div>
  );
};

const mapStateToProps = state => {
  return { recipe: state.recipe };
};

export default connect(
  mapStateToProps,
  { toggleReview }
)(RecipeDetails);
