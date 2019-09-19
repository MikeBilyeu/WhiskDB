import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      review: ""
    };
  }
  renderRating = () => {
    return this.state.starColor.map((color, i) => {
      return (
        <Star
          key={"star" + i}
          style={{
            width: "2.3rem",
            fill: color,
            cursor: "pointer"
          }}
          onMouseEnter={() => this.handleMouseEnter(i)}
          onClick={() => {
            this.setState({ rating: i + 1 });
          }}
        />
      );
    });
  };

  handleMouseEnter = rating => {
    this.setState(({ starColor }) => {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        colors = [...colors, rating + 1 > i ? "#FFA805" : "#E2E2E2"];
      }
      return {
        starColor: colors
      };
    });
  };

  handleMouseLeave = () => {
    this.setState(({ starColor }) => {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        colors = [...colors, this.state.rating > i ? "#FFA805" : "#E2E2E2"];
      }
      return {
        starColor: colors
      };
    });
  };

  componentDidMount() {
    this.setState({
      starColor: ["#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2", "#E2E2E2"],
      rating: 0,
      review: ""
    });
  }

  handleChage = e => {
    this.setState({ review: e.target.value });
  };

  handleSubmit = () => {
    const review = {
      recipe_id: this.props.recipe_id,
      user_id: this.props.user_id,
      rating: this.state.rating,
      review: this.state.review
    };
    this.props.submitReview(review);
  };
  render() {
    const { recipe_id, user_id, starClicked, submitReview } = this.props;
    return (
      <div className="rate">
        <Close
          style={{
            width: "1.5rem",
            margin: "1rem",
            cursor: "pointer"
          }}
          onClick={this.props.toggleReview}
        />
        <h2>How was it?</h2>
        {this.state.rating && user_id == undefined ? (
          <h3>
            You must{" "}
            {
              <Link to="/auth" style={{ color: "#0172c4" }}>
                Login
              </Link>
            }{" "}
            to rate recipe
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
          <span style={{ position: "ablsolute" }}>(optional)</span>
          <textarea
            style={{
              border: "solid #A3A3A3 .08rem",
              borderRadius: ".3rem",
              maxWidth: "98%",
              minWidth: "98%",
              minHeight: "7rem",
              maxHeight: "10rem",
              padding: ".5rem",
              fontSize: "1.1rem"
            }}
            placeholder="Write a review…"
            value={this.state.review}
            onChange={this.handleChage}
          />
        </label>
        <div
          style={{
            backgroundColor: "#0172C4",
            color: "#FFF",
            textAlign: "center",
            padding: ".8rem",
            width: "90%",
            margin: "1rem auto",
            fontSize: "1.3rem",
            borderRadius: ".3rem",
            fontWeight: "600",
            opacity: this.state.rating && user_id !== undefined ? "1" : ".1",
            cursor:
              this.state.rating && user_id !== undefined ? "pointer" : "auto"
          }}
          onClick={
            this.state.rating && user_id !== undefined
              ? this.handleSubmit
              : null
          }
        >
          Submit
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.user_id,
  rating: state.recipe.rating
});

export default connect(
  mapStateToProps,
  { toggleReview, submitReview }
)(Rate);
