import React from "react";
import renderTime from "../../../utils/time";
import Footnote from "./footnote";

const Directions = ({ time, directions, footnote }) => {
  return (
    <div className="directions">
      <h2>Directions</h2>
      <div className="time">{renderTime(time)}</div>
      <p id="directions">{directions}</p>
      <Footnote footnote={footnote} />
    </div>
  );
};

export default Directions;
