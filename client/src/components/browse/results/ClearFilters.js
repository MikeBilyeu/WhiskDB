import React from "react";
import { connect } from "react-redux";

import { getBrowseRecipes } from "../../../actions/browseActions";

const ClearFilters = ({ numOfResults, getBrowseRecipes }) => {
  const handleClick = () => {
    getBrowseRecipes({
      search: "",
      meal: "All Meals",
      diet: "None",
      cuisine: "All Cuisines",
      sort: "Top Rated"
    });
  };

  return (
    <div className="results_clear">
      <div className="numOfResults">
        ({numOfResults}) Result
        {numOfResults === 1 ? "" : "s"}
      </div>
      <div onClick={handleClick} className="clear-filters">
        Clear Filters
      </div>
    </div>
  );
};

export default connect(
  null,
  { getBrowseRecipes }
)(ClearFilters);
