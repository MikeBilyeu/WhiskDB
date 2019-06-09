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
        borderTop: "solid 0.01rem #e3e3e3",
        borderBottom: "solid 0.01rem #e3e3e3",
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
