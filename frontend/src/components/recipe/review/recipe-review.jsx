import React, { useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Stars from "./stars";
import ReviewDetails from "./details";
import { submitReview } from "../../../actions/review";
import "./recipe-review.scss";

const Review = props => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleChange = e => {
    setComment(e.target.value);
  };

  const handleClick = rating => {
    setRating(rating);
  };

  const handleSubmit = () => {
    const review = {
      recipe_id: props.recipe_id,
      rating: rating,
      comment: comment
    };
    props.submitReview(review);
  };

  return (
    <div className="review">
      <ReviewDetails recipe_id={props.recipe_id} />
      {!props.isAuthenticated ? (
        <>
          <h3 className="review__login-text">
            You must login to rate a recipe.
          </h3>
          <Link to="/auth/login" className="review__login-btn">
            Login
          </Link>
        </>
      ) : (
        <>
          <Stars handleClick={handleClick} rating={rating} />
          <label className="review__input-label">
            Review
            <textarea
              className="review__input"
              placeholder="Write a review…"
              value={comment}
              onChange={handleChange}
            />
          </label>

          <div
            className={classNames("review__sbmt-btn", {
              "review__sbmt-btn--active": rating
            })}
            onClick={rating ? handleSubmit : null}
          >
            Submit
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { submitReview }
)(Review);
