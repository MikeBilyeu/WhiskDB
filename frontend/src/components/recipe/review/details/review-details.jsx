import React from "react";
import { connect } from "react-redux";
import { getRatingPercentage } from "../../../../actions/review";
import StarVotes from "./star_votes";

class ReviewDetails extends React.Component {
  componentDidMount() {
    this.props.getRatingPercentage(this.props.recipe_id);
  }
  render() {
    const {
      ratingPercentage: { star5, star4, star3, star2, star1, num_reviews }
    } = this.props;

    return (
      <div className="review-details">
        <h2 className="review-details__num-votes">
          {num_reviews + " "} vote{num_reviews === 1 ? "" : "s"}
        </h2>
        <StarVotes star="5" votes={star5} num_reviews={num_reviews} />
        <StarVotes star="4" votes={star4} num_reviews={num_reviews} />
        <StarVotes star="3" votes={star3} num_reviews={num_reviews} />
        <StarVotes star="2" votes={star2} num_reviews={num_reviews} />
        <StarVotes star="1" votes={star1} num_reviews={num_reviews} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ratingPercentage: state.recipe.ratingPercentage };
};

export default connect(
  mapStateToProps,
  { getRatingPercentage }
)(ReviewDetails);
