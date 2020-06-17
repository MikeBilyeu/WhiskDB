import React from "react";

const Instructions = ({ instructions, footnote }) => {
  return (
    <div className="r-directions">
      <p className="r-directions__text">{instructions}</p>
      {footnote ? <p className="r-directions__footnote">{footnote}</p> : null}
    </div>
  );
};

export default Instructions;
