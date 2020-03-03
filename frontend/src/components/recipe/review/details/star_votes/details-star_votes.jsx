import React from "react";

const StarVotes = ({ star, num_reviews, votes }) => {
  num_reviews = num_reviews || 1;
  return (
    <div className="review-details-votes">
      <span className="review-details-votes__star-num">{star} star</span>
      <div className="review-details-votes__bar">
        <div
          className="review-details-votes__percent-bar"
          style={{
            width: `${(votes / num_reviews) * 100}%`
          }}
        ></div>
      </div>
      <span className="review-details-votes__percent-num">{`${Math.round(
        (votes / num_reviews) * 100
      )}%`}</span>
    </div>
  );
};

export default StarVotes;
