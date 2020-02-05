import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { ReactComponent as SortIcon } from "../../assets/images/SortIcon.svg";
import { ReactComponent as OpenArrow } from "../../assets/images/openArrow.svg";
import { abbreviateSortBy } from "./utils";
import "./sort_button.scss";

const SortButton = ({ sortBy, onClick, sortActive, className, ...props }) => {
  return (
    <Button onClick={onClick} className={`arrow-style ${className}`}>
      <SortIcon
        className="sort-icon mobile"
        style={{ width: "1.3rem", margin: "auto" }}
      />

      <div className="sortBy" style={{ display: "inline" }}>
        <span className="desktop">
          Sort by <span style={{ fontWeight: "bold" }}>{sortBy}</span>
        </span>
        <span className="mobile"> {abbreviateSortBy(sortBy)}</span>
      </div>
      <OpenArrow
        style={{ display: "inline" }}
        className="sort-icon openArrow desktop"
      />
    </Button>
  );
};

SortButton.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sortActive: PropTypes.bool.isRequired
};

export default SortButton;
