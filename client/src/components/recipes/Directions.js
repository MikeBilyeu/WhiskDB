import React from "react";

const Directions = props => {
  const renderDirections =
    props.directions &&
    props.directions.map((step, i) => {
      return (
        <li key={`step${i}`}>
          <h4>{i + 1}</h4>
          <p>{step.step}</p>
        </li>
      );
    });

  return (
    <div className="recipe-list directions">
      <h2>Directions</h2>
      <div className="time">Time: {props.time}</div>
      <ol>{renderDirections}</ol>
    </div>
  );
};

export default Directions;
