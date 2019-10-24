import React from "react";
import PropTypes from "prop-types";

import { Button } from "../Button";
import { ReactComponent as SortIcon } from "../../images/SortIcon.svg";

import "./sort-button.css";

export const SortButton = ({ sortBy, onClick, sortActive, ...props }) => {
  const abbreviateSortBy = sortBy => {
    // return shorter text for disply under the sortIcon button
    switch (sortBy) {
      case "Date Saved":
        return "Saved";
      case "Top Rated":
        return "Rated";
      case "Time":
        return "Time";
      case "Newest":
        return "New";
      default:
        return sortBy;
    }
  };
  return (
    <Button onClick={onClick} className="arrow-style">
      <SortIcon
        style={{
          fill: sortActive === "Sort" ? "#0172C4" : "#676767"
        }}
        className="sort-icon"
      />
      {abbreviateSortBy(sortBy)}
    </Button>
  );
};

SortButton.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sortActive: PropTypes.bool.isRequired
};
