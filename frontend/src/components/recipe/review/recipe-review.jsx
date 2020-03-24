import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Stars from "./stars";
import Rating from "../rating";
import TextArea from "../../form_inputs/textarea";
import ReviewDetails from "./details";
import { submitReview, getRecipeReview } from "../../../actions/review";
import "./recipe-review.scss";

const Review = props => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    props.getRecipeReview(props.recipe_id);
  }, []);

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
      ) : props.review ? (
        <div className="user-review">
          <h4 className="user-review__username">{props.username}</h4>
          <Rating className="user-review__star" rating={props.review.rating} />
          <p className="user-review__comment">
            {props.review.comment ||
              "You didn't leave a comment for this recipe."}
          </p>
        </div>
      ) : (
        <>
          <Stars handleClick={handleClick} rating={rating} />

          <TextArea
            className="review-comment"
            placeholder="Write a review…"
            label="Review"
            input={{ onChange: handleChange, value: comment }}
            meta={{ touched: null, error: null }}
          />

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
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.username,
  review: state.recipe.review
});

export default connect(
  mapStateToProps,
  { submitReview, getRecipeReview }
)(Review);
