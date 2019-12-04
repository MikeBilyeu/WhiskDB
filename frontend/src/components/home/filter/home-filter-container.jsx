import React from "react";
import { connect } from "react-redux";
import { getBrowseRecipes } from "../../../actions/browseActions";
import Button from "../../button";
import "./home-filter.scss";

const Filter = ({
  filterOptions,
  filterType,
  browseData,
  getBrowseRecipes
}) => {
  const handleClick = option => {
    // set the browseData to the option selected
    getBrowseRecipes({ ...browseData, [filterType]: option, search: "" });
  };

  const renderFilterOptions = () => {
    return filterOptions.map((option, i) => {
      const buttonStyle = `filter-option ${Object.values(browseData).indexOf(
        option
      ) > 0 && "option-active"}`;
      return (
        <Button
          key={i + option}
          className={buttonStyle}
          onClick={() => {
            handleClick(option);
          }}
        >
          {option}
        </Button>
      );
    });
  };

  return (
    <div className="filter-box">
      <h2>{filterType}</h2>
      {renderFilterOptions()}
    </div>
  );
};

const mapSateToProps = state => {
  return {
    browseData: state.browseRecipes.browseData
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes }
)(Filter);
