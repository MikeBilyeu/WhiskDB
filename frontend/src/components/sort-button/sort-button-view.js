import React from "react";
import PropTypes from "prop-types";

import { Button } from "../Button";
import { ReactComponent as SortIcon } from "../../images/SortIcon.svg";

// uitls
import { abbreviateSortBy } from "./utils";

import "./sort-button.css";

const SortButton = ({ sortBy, onClick, sortActive, ...props }) => {
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

export default SortButton;
