import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { toggleFilterBtnBrowse } from "../../actions/browse";
import { ReactComponent as SortIcon } from "../../assets/images/SortIcon.svg";
import { ReactComponent as OpenArrow } from "../../assets/images/openArrow.svg";
import { abbreviateSortBy } from "./utils";
import "./sort_button.scss";

const SortButton = props => {
  const active = props.activeFilterBtn === "Sort";
  return (
    <button
      className={props.className}
      onClick={() => props.toggleFilterBtnBrowse("Sort")}
    >
      <SortIcon className={`${props.className}__icon-m`} />
      <div className={`${props.className}__sort-by-m`}>
        {abbreviateSortBy(props.sortBy)}
      </div>

      <div className={`${props.className}__sort-by-d`}>
        Sort by <span style={{ fontWeight: "bold" }}>{props.sortBy}</span>
      </div>
      <OpenArrow
        className={classNames(`${props.className}__icon-d`, {
          [`${props.className}__icon-d--active`]: active
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
