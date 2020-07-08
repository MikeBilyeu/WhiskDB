import React from "react";
import "./results-no_results.scss";

const NoResults = props => {
  return (
    <div className="no-results">
      <h1 className="no-results__title">
        Sorry,
        <br /> we couldn't find any recipes{" "}
        <span style={{ whiteSpace: "nowrap" }}>:(</span>
      </h1>
      <h2 className="no-results__msg">
        Please try searching for another recipe!
      </h2>
    </div>
  );
};

export default NoResults;
