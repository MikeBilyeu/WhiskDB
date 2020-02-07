import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { filterOptions } from "./utils";
import { getBrowseRecipes } from "../../actions/browseActions";

import "./filter_results.scss";

const RenderOptions = (options, type, filterRecipes, handleClick) => {
  return options.map((option, i) => {
    const btnStyle = classNames("filter-list__option", {
      "filter-list__option--active":
        Object.values(filterRecipes).indexOf(option) >= 0
    });
    return (
      <button
        key={i + option}
        className={btnStyle}
        onClick={() => {
          handleClick(option, type);
        }}
      >
        {option}
      </button>
    );
  });
};

const FilterResults = ({
  filterRecipes,
  getBrowseRecipes,
  handleClick,
  buttonToggled,
  className
}) => {
  const { options, type } = filterOptions(buttonToggled);

  return (
    <div className={`filter-results-${type}`}>
      <h2 className={`filter-results-${type}__title`}>{type}</h2>
      <ul className="filter-list">
        {RenderOptions(options, type, filterRecipes, handleClick)}
      </ul>
    </div>
  );
};

FilterResults.propTypes = {
  handleClick: PropTypes.func.isRequired,
  filterRecipes: PropTypes.object.isRequired,
  getBrowseRecipes: PropTypes.func.isRequired
};

export default connect(
  null,
  { getBrowseRecipes }
)(FilterResults);
