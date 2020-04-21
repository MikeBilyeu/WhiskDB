import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Stars from "./stars";
import Rating from "../rating";
import RecentReviews from "./recent-reviews";
import TextArea from "../../form_inputs/textarea";
import ReviewDetails from "./details";
import { submitReview, getRecentReviews } from "../../../actions/review";
import "./recipe-review.scss";

const Review = props => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    props.getRecentReviews(props.recipe_id);
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
      <RecentReviews reviews={props.reviews} />
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
      ) : Object.keys(props.myReview).length === 0 ? (
        <div>
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
        </div>
      ) : (
        <div className="user-review">
          <h4 className="user-review__username">{props.myReview.username}</h4>
          <Rating
            className="user-review__star"
            rating={props.myReview.rating}
          />
          <p className="user-review__comment">
            {props.myReview.comment
              ? `"${props.myReview.comment}"`
              : `You didn't leave a comment for this recipe.`}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  reviews: state.recipe.reviews,
  myReview: state.recipe.myReview
});

export default connect(
  mapStateToProps,
  { submitReview, getRecentReviews }
)(Review);
