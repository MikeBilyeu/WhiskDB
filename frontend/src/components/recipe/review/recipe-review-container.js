import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Stars from "./stars";
import Details from "./details";

import { ReactComponent as Close } from "../../../assets/images/removeDark.svg";
import { toggleReview, submitReview } from "../../../actions/rateActions";
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
    this.setState({ rating: rating + 1 });
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
      <div className="rate">
        <Close className="close-btn" onClick={this.props.toggleReview} />

        {!isAuthenticated ? (
          <h3>
            {"You must "}
            <Link to="/auth" style={{ color: "#0172c4" }}>
              login
            </Link>
            {" to rate a recipe."}
          </h3>
        ) : (
          <div style={{ width: "100%" }}>
            <h2>How was it?</h2>
            <Stars handleClick={this.handleClick} rating={this.state.rating} />
            <label className="review">
              Review
              <textarea
                placeholder="Write a review…"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </label>

            <div
              className="submit-review"
              style={{
                opacity: this.state.rating && isAuthenticated ? "1" : ".5",
                cursor:
                  this.state.rating && isAuthenticated ? "pointer" : "auto"
              }}
              onClick={
                this.state.rating && isAuthenticated ? this.handleSubmit : null
              }
            >
              Submit
            </div>
          </div>
        )}

        <Details recipe_id={recipe_id} />
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
