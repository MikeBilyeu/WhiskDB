import React from "react";

const Directions = props => {
  const renderDirections =
    props.directions &&
    props.directions.map((step, i) => {
      return (
        <li key={`step${i}`} style={{ listStyleType: "none" }}>
          <h4>{i + 1}</h4>
          {step.step}
        </li>
      );
    });
  const formatMinsToHours = totalMinutes => {
    const hours =
      Math.floor(totalMinutes / 60) !== 0
        ? `${Math.floor(totalMinutes / 60)}h`
        : ``;
    const minutes = totalMinutes % 60 !== 0 ? `${totalMinutes % 60}m` : ``;
    return `${hours} ${minutes}`;
  };
  return (
    <div className="recipe-list directions">
      <h2>Directions</h2>
      <div className="time">Time: {formatMinsToHours(props.time)}</div>
      <ol>{renderDirections}</ol>
    </div>
  );
};

export default Directions;
