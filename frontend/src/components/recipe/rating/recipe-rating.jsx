import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { ReactComponent as Star } from "../../../assets/images/star.svg";
import { ReactComponent as OpenArrow } from "../../../assets/images/filterArrow.svg";
import "./recipe-rating.scss";

const Rating = props => {
  const updateRating = () => {
    let colors = [];
    for (let i = 0; i < 5; i++) {
      colors.push(Math.round(props.rating) > i ? "#FFA805" : "#E2E2E2");
    }
    return colors;
  };

  const [starColors, setStarColors] = useState(updateRating);

  useEffect(() => {
    setStarColors(updateRating);
  }, [props.rating]);

  const renderRating = starColors.map((color, i) => (
    <Star
      className="star"
      key={"star" + i + color}
      style={{ width: "1.1rem", fill: color }}
    />
  ));

  const numVotes =
    props.votes > 1000
      ? `${parseFloat((props.votes / 1000).toFixed(1))}k`
      : props.votes < 1
      ? ""
      : `${props.votes}`;

  return (
    <div className={`${props.className}-rating`} onClick={props.onClick}>
      <div className={`${props.className}-rating__stars`}>{renderRating}</div>
      <div className={`${props.className}-rating__votes`}>{numVotes}</div>
      <OpenArrow
        className={classNames(`${props.className}-rating__arrow`, {
          [`${props.className}-rating__arrow--active`]: props.active
        })}
      />
    </div>
  );
};

export default Rating;
