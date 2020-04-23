import React from "react";
import { connect } from "react-redux";
import { toggleReview } from "../../actions/review";
import renderTime from "../../utils/time";
import Rating from "./rating";
import Review from "./review";

const RecipeDetails = props => {
  return (
    <div className="recipe__details">
      <h1 className="recipe__title">{props.recipe.recipe.title}</h1>
      <Rating
        className="recipe"
        onClick={props.toggleReview}
        rating={props.recipe.recipe.rating}
        votes={props.recipe.recipe.num_reviews}
        active={props.recipe.reviewOpen}
      />
      {props.recipe.reviewOpen && (
        <Review recipe_id={props.recipe.recipe.recipe_id} />
      )}
      <div className="recipe__time">{renderTime(props.time)}</div>
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
