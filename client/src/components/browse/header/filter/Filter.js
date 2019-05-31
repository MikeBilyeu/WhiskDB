import React from "react";

import FilterOption from "./FilterOption";

const Filter = props => {
  const renderFilterOptions = () => {
    return props.filterOptions.map((option, i) => {
      return (
        <FilterOption
          key={option + i}
          option={option}
          filterType={props.filterType}
        />
      );
    });
  };
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        borderTop: ".1rem solid #BFBFBF",
        borderBottom: ".1rem solid #BFBFBF",
        display: "grid",
        gridAutoFlow: "column",
        placeItems: "center",
        margin: ".5rem 0 0 0",
        padding: ".6rem",
        overflow: "hidden"
      }}
    >
      {renderFilterOptions()}
    </div>
  );
};
export default Filter;
