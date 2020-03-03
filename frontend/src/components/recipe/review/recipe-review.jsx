import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Stars from "./stars";
import ReviewDetails from "./details";
import { toggleReview, submitReview } from "../../../actions/review";
import "./recipe-review.scss";

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      comment: ""
    };
  }

  componentDidMount() {
    this.setState({
      rating: 0,
      comment: ""
    });
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleClick = rating => {
    console.log(rating);
    this.setState({ rating: rating });
  };

  handleSubmit = () => {
    const review = {
      recipe_id: this.props.recipe_id,
      rating: this.state.rating,
      comment: this.state.comment
    };
    this.props.submitReview(review);
  };

  render() {
    const { recipe_id, isAuthenticated } = this.props;
    return (
      <div className="review">
        <ReviewDetails recipe_id={recipe_id} />
        {!isAuthenticated ? (
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
            <Stars handleClick={this.handleClick} rating={this.state.rating} />
            <label className="review__input-label">
              Review
              <textarea
                className="review__input"
                placeholder="Write a review…"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </label>

            <div
              className={classNames("review__sbmt-btn", {
                "review__sbmt-btn--active": this.state.rating
              })}
              onClick={this.state.rating ? this.handleSubmit : null}
            >
              Submit
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  rating: state.recipe.rating
});

export default connect(
  mapStateToProps,
  { toggleReview, submitReview }
)(Review);
