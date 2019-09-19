import React from "react";

const Directions = props => {
  const renderDirections =
    props.directions &&
    props.directions.map((step, i) => {
      return (
        <li key={`step${i}`}>
          <p>{step.step}</p>
        </li>
      );
    });

  const renderFootnote = () => {
    if (props.footnote !== null) {
      return (
        <div className="footnote">
          <p>
            <span style={{ fontWeight: "900", fontStyle: "normal" }}>
              {"Footnote: "}
            </span>
            {props.footnote}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="recipe-list directions">
      <h2>Directions</h2>
      <div className="time">Time: {props.time}</div>
      <ol>{renderDirections}</ol>
      {renderFootnote()}
    </div>
  );
};

export default Directions;
