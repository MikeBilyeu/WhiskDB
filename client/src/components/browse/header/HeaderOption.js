import React from "react";

import FilterButton from "./filter-buttons/FilterButton";

const HeaderOption = () => {
  return (
    <div
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
        margin: ".5rem 0"
      }}
    >
      <FilterButton buttonName="Diet" />

      <FilterButton buttonName="Cuisine" />

      <FilterButton buttonName="Meal" />
    </div>
  );
};

export default HeaderOption;
