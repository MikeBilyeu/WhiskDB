import React from "react";

//components
import SearchBar from "./search-bar/SearchBar";
import { ReactComponent as WhiskIcon } from "./WhiskIcon.svg";
import SortButton from "./sort-button/SortButton";
import FilterButton from "./filter-buttons/FilterButton";

//styles
import "./header-styles.css";

const HomeHeader = () => {
  return (
    <div className="header">
      <SearchBar />
      <WhiskIcon className="whisk-title" />
      <SortButton />
      <FilterButton buttonName="Diet" />
      <FilterButton buttonName="Meal" />
    </div>
  );
};

export default HomeHeader;
