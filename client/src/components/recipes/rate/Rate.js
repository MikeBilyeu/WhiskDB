import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ReviewDetails from "./ReviewDetails";

import { ReactComponent as Star } from "../../../images/star.svg";
import { ReactComponent as Close } from "../../../images/removeDark.svg";

// Action Creator
import { toggleReview, submitReview } from "../../../actions/rateActions";

// styles
import "./rate-styles.css";

class Rate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starColor: ["#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2"],
      rating: 0,
      comment: ""
    };
  }
  renderRating = () => {
    return this.state.starColor.map((color, i) => {
      return (
        <Star
          key={"star" + i}
          style={{
            width: "2rem",
            fill: color,
            cursor: "pointer"
          }}
          onMouseEnter={() => this.handleMouseEnter(i + 1)}
          onClick={() => {
            this.setState({ rating: i + 1 });
          }}
        />
      );
    });
  };

  setStarColor = rating => {
    this.setState(() => {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        colors = [...colors, rating > i ? "#FFA805" : "#E2E2E2"];
      }
      return { starColor: colors };
    });
  };

  handleMouseEnter = rating => {
    this.setStarColor(rating);
  };

  handleMouseLeave = () => {
    this.setStarColor(this.state.rating);
  };

  componentDidMount() {
    this.setState({
      starColor: ["#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2"],
      rating: 0,
      review: ""
    });
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
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
    const {
      recipe_id,
      num_reviews,
      starClicked,
      submitReview,
      isAuthenticated
    } = this.props;
    return (
      <div className="rate">
        <Close
          style={{
            width: "2rem",
            padding: ".5rem",
            cursor: "pointer"
          }}
          onClick={this.props.toggleReview}
        />
        {this.props.rated ? null : (
          <div>
            <h2>How was it?</h2>
            {this.state.rating && !isAuthenticated ? (
              <h3>
                {"You must "}
                <Link to="/auth" style={{ color: "#0172c4" }}>
                  login
                </Link>
                {" to rate a recipe."}
              </h3>
            ) : null}
            <div
              onMouseLeave={this.handleMouseLeave}
              style={{
                display: "grid",
                gridAutoFlow: "column",
                placeItems: "center",
                width: "12rem",
                margin: "auto"
              }}
            >
              {this.renderRating()}
            </div>
            <label>
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

        <ReviewDetails recipe_id={recipe_id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  rating: state.recipe.rating,
  rated: state.recipe.recipe.user_rated
});

export default connect(
  mapStateToProps,
  { toggleReview, submitReview }
)(Rate);
