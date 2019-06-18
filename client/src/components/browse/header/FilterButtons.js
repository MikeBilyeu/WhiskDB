import React from "react";

import FilterButton from "./filter-buttons/FilterButton";

const FilterButtons = () => {
  return (
    <div
      className="filter-buttons"
      style={{
        height: "2.5rem",
        display: "grid",
        width: "100%",
        padding: "0 .1rem",
        gridAutoFlow: "column",
        placeItems: "center",
        userSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        MsUserSelect: "none",
        margin: ".5rem 0",
        gridArea: "fb"
      }}
    >
      <FilterButton style={{ gridArea: "cuisine" }} buttonName="Cuisine" />
      <FilterButton style={{ gridArea: "diet" }} buttonName="Diet" />
      <FilterButton style={{ gridArea: "meal" }} buttonName="Meal" />
    </div>
  );
};

export default FilterButtons;
