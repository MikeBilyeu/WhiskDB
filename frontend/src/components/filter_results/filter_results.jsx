import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { filterOptions } from "./utils";
import { getBrowseRecipes } from "../../actions/browseActions";
import Button from "../button";

import "./filter_results.scss";

const FilterResults = ({
  filterRecipes,
  getBrowseRecipes,
  handleClick,
  buttonToggled,
  className
}) => {
  const { options, type } = filterOptions(buttonToggled);

  const renderFilterOptions = () => {
    return options.map((option, i) => {
      const buttonStyle = `filter-option ${Object.values(filterRecipes).indexOf(
        option
      ) >= 0 && "option-active"}`;
      return (
        <Button
          key={i + option}
          className={buttonStyle}
          onClick={() => {
            handleClick(option, type);
          }}
        >
          {option}
        </Button>
      );
    });
  };

  return (
    <div className={`filter-box ${className}`}>
      <h2>{type}</h2>
      <ul>{renderFilterOptions()}</ul>
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
