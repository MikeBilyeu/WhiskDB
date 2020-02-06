import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as SortIcon } from "../../assets/images/SortIcon.svg";
import { ReactComponent as OpenArrow } from "../../assets/images/openArrow.svg";
import { abbreviateSortBy } from "./utils";
import "./sort_button.scss";

const SortButton = ({ sortBy, onClick, ...props }) => {
  return (
    <button onClick={onClick} className="sort-btn">
      <SortIcon className="sort-btn__mobile-icon" />
      <div className="sort-btn__mobile-sort-by">{abbreviateSortBy(sortBy)}</div>

      <div className="sort-btn__desktop-sort-by">
        Sort by <span style={{ fontWeight: "bold" }}>{sortBy}</span>
      </div>
      <OpenArrow className="sort-btn__desktop-icon" />
    </button>
  );
};

SortButton.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SortButton;
