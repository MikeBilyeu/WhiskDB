import React from "react";

const ClearFilters = ({ numOfResults }) => {
  return (
    <div className="results_clear">
      <div className="numOfResults">
        ({numOfResults}) Result
        {numOfResults == 1 ? "" : "s"}
      </div>
      <div className="clear-filters">Clear Filters</div>
    </div>
  );
};

export default ClearFilters;
