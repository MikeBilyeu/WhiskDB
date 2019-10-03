import React from "react";
import { connect } from "react-redux";

import { getRatingDetails } from "../../../actions/rateActions";

const RatingDetail = ({ star, num_reviews, votes }) => {
  num_reviews = num_reviews || 1;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3rem 1fr 3rem",
        placeItems: "center",
        margin: ".5rem 0"
      }}
    >
      <span>{star} star</span>
      <div
        style={{
          overflow: "hidden",
          height: "1.6rem",
          width: "100%",
          border: "solid #E3E3E3 .1rem",
          backgroundColor: "#F5F5F5",
          display: "grid",
          AlignItems: "center",
          borderRadius: ".2rem"
        }}
      >
        <div
          style={{
            backgroundColor: "#FFB652",
            height: "100%",
            minHeight: "100%",
            width: `${(votes / num_reviews) * 100}%`
          }}
        ></div>
      </div>
      <span style={{ justifySelf: "end" }}>{`${Math.round(
        (votes / num_reviews) * 100
      )}%`}</span>
    </div>
  );
};

class ReviewDetails extends React.Component {
  componentDidMount() {
    this.props.getRatingDetails(this.props.recipe_id);
  }
  render() {
    const {
      ratingDetails: { star5, star4, star3, star2, star1, num_reviews }
    } = this.props;

    return (
      <div className="review-details">
        <h2>
          {num_reviews + " "} vote{num_reviews == 1 ? "" : "s"}
        </h2>
        <RatingDetail star="5" votes={star5} num_reviews={num_reviews} />
        <RatingDetail star="4" votes={star4} num_reviews={num_reviews} />
        <RatingDetail star="3" votes={star3} num_reviews={num_reviews} />
        <RatingDetail star="2" votes={star2} num_reviews={num_reviews} />
        <RatingDetail star="1" votes={star1} num_reviews={num_reviews} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ratingDetails: state.recipe.ratingDetails };
};

export default connect(
  mapStateToProps,
  { getRatingDetails }
)(ReviewDetails);
