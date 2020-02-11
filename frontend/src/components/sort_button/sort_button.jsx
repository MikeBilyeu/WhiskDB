import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { toggleFilterBtnBrowse } from "../../actions/browseActions";
import { ReactComponent as SortIcon } from "../../assets/images/SortIcon.svg";
import { ReactComponent as OpenArrow } from "../../assets/images/openArrow.svg";
import { abbreviateSortBy } from "./utils";
import "./sort_button.scss";

// Mobile
const SortButton = ({
  sortBy,
  toggleFilterBtnBrowse,
  activeFilterBtn,
  className
}) => {
  const active = activeFilterBtn === "Sort";
  return (
    <button
      className={classNames(`${className}`)}
      onClick={() => toggleFilterBtnBrowse("Sort")}
    >
      <SortIcon className={classNames(`${className}__icon-m`)} />
      <div className={classNames(`${className}__sort-by-m`)}>
        {abbreviateSortBy(sortBy)}
      </div>

      <div className={classNames(`${className}__sort-by-d`)}>
        Sort by <span style={{ fontWeight: "bold" }}>{sortBy}</span>
      </div>
      <OpenArrow
        className={classNames(`${className}__icon-d`, {
          [`${className}__icon-d--active`]: active
        })}
      />
    </button>
  );
};

const mapStatetoProps = state => ({
  activeFilterBtn: state.browseRecipes.activeFilterBtn,
  sortBy: state.browseRecipes.filterRecipes.sort
});

SortButton.propTypes = {
  className: PropTypes.string.isRequired
};

export default connect(
  mapStatetoProps,
  { toggleFilterBtnBrowse }
)(SortButton);
