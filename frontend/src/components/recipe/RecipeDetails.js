import React from "react";
import { connect } from "react-redux";
import { toggleReview } from "../../actions/review";
import renderTime from "../../utils/time";
import Rating from "./rating";

const RecipeDetails = ({
  recipe: {
    recipe: { title, date_created, username, total_time_min },
    ratingDetails: { rating, num_reviews }
  },
  time,
  toggleReview
}) => {
  return (
    <div className="recipe__details">
      <h1 className="recipe__title">{title}</h1>
      <Rating
        className="recipe"
        onClick={toggleReview}
        rating={rating}
        votes={num_reviews}
      />
      <div className="recipe__time">{renderTime(time)}</div>
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
