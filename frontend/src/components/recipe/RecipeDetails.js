import React from "react";
import { connect } from "react-redux";
import { toggleReview } from "../../actions/rateActions";
import { ReactComponent as DownArrow } from "../../assets/images/arrowLeft.svg";
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
      <DownArrow
        className="down-arrow"
        style={{
          width: "1.3rem",
          opacity: ".1",
          transform: "rotate(-90deg)",
          marginTop: "1rem"
        }}
      />
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
