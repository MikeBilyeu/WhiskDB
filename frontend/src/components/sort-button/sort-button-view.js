import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { ReactComponent as SortIcon } from "../../assets/images/SortIcon.svg";
import { abbreviateSortBy } from "./utils";
import "./sort-button.scss";

const SortButton = ({ sortBy, onClick, sortActive, ...props }) => {
  console.log(sortActive);
  return (
    <Button onClick={onClick} className="arrow-style">
      <div>
        <SortIcon
          style={{
            fill: sortActive ? "#0172C4" : "#464646"
          }}
          className="sort-icon"
        />
      </div>
      <div
        style={{
          color: sortActive ? "#0172C4" : "#464646"
        }}
      >
        {abbreviateSortBy(sortBy)}
      </div>
    </Button>
  );
};

SortButton.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sortActive: PropTypes.bool.isRequired
};

export default SortButton;
