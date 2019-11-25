import React from "react";

const StarVotes = ({ star, num_reviews, votes }) => {
  num_reviews = num_reviews || 1;
  return (
    <div className="vote-bar">
      <span>{star} star</span>
      <div className="vote-percent-bar">
        <div
          className="votes-percent"
          style={{
            width: `${(votes / num_reviews) * 100}%`
          }}
        ></div>
      </div>
      <span className="percent-num">{`${Math.round(
        (votes / num_reviews) * 100
      )}%`}</span>
    </div>
  );
};

export default StarVotes;
