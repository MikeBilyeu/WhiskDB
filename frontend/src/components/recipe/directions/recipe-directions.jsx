import React from "react";

const Directions = ({ directions, footnote }) => {
  return (
    <div className="r-directions">
      <p className="r-directions__text">{directions}</p>
      {footnote ? <p className="r-directions__footnote">{footnote}</p> : null}
    </div>
  );
};

export default Directions;
