import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { ReactComponent as SortIcon } from "../../assets/images/SortIcon.svg";
import { abbreviateSortBy } from "./utils";
import "./sort-button.scss";

const SortButton = ({ sortBy, onClick, sortActive, ...props }) => {
  return (
    <Button onClick={onClick} className="arrow-style">
      <div>
        <SortIcon
          style={{
            fill: sortActive === "Sort" ? "#0172C4" : "#464646"
          }}
          className="sort-icon"
        />
      </div>
      <div>{abbreviateSortBy(sortBy)}</div>
    </Button>
  );
};

SortButton.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sortActive: PropTypes.bool.isRequired
};

export default SortButton;
