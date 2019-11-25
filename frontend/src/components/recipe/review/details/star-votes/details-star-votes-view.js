import React from "react";

const StarVotes = ({ star, num_reviews, votes }) => {
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
          height: "1.3rem",
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

export default StarVotes;
