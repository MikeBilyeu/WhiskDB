import React from "react";

import FilterOption from "./FilterOption";

import "./filter-styles.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }
  renderFilterOptions = () => {
    return this.props.filterOptions.map((option, i) => {
      return (
        <FilterOption
          key={option + i}
          option={option}
          filterType={this.props.filterType}
        />
      );
    });
  };

  render() {
    return (
      <div className="filter-box">
        <h2 className="filter-title">{this.props.filterType}</h2>
        {this.renderFilterOptions()}
      </div>
    );
  }
}
export default Filter;
