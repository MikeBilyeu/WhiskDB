import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as SortIcon } from "../../assets/images/SortIcon.svg";
import { ReactComponent as OpenArrow } from "../../assets/images/openArrow.svg";
import { abbreviateSortBy } from "./utils";
import "./sort_button.scss";

// Mobile
export const SortButton = ({ sortBy, onClick, ...props }) => {
  return (
    <button onClick={onClick} className="sort-btn">
      <SortIcon className="sort-btn__icon" />
      <div className="sort-btn__sort-by">{abbreviateSortBy(sortBy)}</div>
    </button>
  );
};

SortButton.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

// Desktop
export const SortButtonDesktop = ({ sortBy, onClick, ...props }) => {
  return (
    <button onClick={onClick} className="sort-btn-d">
      <div className="sort-btn-d__sort-by">
        Sort by <span style={{ fontWeight: "bold" }}>{sortBy}</span>
      </div>
      <OpenArrow className="sort-btn-d__icon" />
    </button>
  );
};

SortButtonDesktop.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
