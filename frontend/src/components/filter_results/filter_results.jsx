import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { filterOptions } from "./utils";
import { getBrowseRecipes } from "../../actions/browse";

import "./filter_results.scss";

const RenderOptions = (
  options,
  type,
  { sort, category, search },
  handleClick
) => {
  return options.map((option, i) => {
    let activeBtn = option === (type === "sort" ? sort : !search && category);
    const btnStyle = classNames("filter-list__option", {
      "filter-list__option--active": activeBtn
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

const FilterResults = props => {
  const { options, type } = filterOptions(props.buttonToggled);

  return (
    <div className={`filter-results-${type}`}>
      <h2 className={`filter-results-${type}__title`}>{type}</h2>
      <ul className="filter-list">
        {RenderOptions(options, type, props.filterRecipes, props.handleClick)}
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
