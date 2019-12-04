import React from "react";

const Footnote = ({ footnote }) => {
  return footnote !== null ? (
    <div id="footnote">
      <p>
        <span style={{ fontWeight: "900", fontStyle: "normal" }}>
          {"Footnote: "}
        </span>
        {footnote}
      </p>
    </div>
  ) : null;
};

export default Footnote;
