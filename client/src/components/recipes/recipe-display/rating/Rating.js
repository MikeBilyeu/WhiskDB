import React from "react";

import { ReactComponent as Star } from "./star.svg";

const Rating = ({ votes, rating }) => {
  const renderRating = () => {
    let starColor = [];
    // push color of star to arr
    for (let i = 0; i < 5; i++) {
      if (i < rating || rating < 1) {
        starColor = [...starColor, "#FFBB5F"];
      } else {
        starColor = [...starColor, "#E2E2E2"];
      }
    }
    return starColor.map((color, i) => {
      return <Star key={"star" + i} style={{ width: "1.3rem", fill: color }} />;
    });
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "7rem 1fr" }}>
      <div>{renderRating()}</div>
      <div>{`${votes} vote${votes !== 1 ? "s" : ""}`}</div>
    </div>
  );
};

export default Rating;
