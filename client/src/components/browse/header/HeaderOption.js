import React from "react";

import FilterButton from "./FilterButton";
import SortButton from "./SortButton";

const HeaderOption = props => {
  return (
    <div
      style={{
        height: "2.5rem",
        display: "grid",
        gridAutoFlow: "column",
        placeItems: "center",
        userSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        MsUserSelect: "none"
      }}
    >
      <FilterButton buttonName="Diet" />
      <FilterButton buttonName="Cuisine" />
      <FilterButton buttonName="Sort" />
    </div>
  );
};

export default HeaderOption;
