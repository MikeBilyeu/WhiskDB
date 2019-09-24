import React from "react";

import SearchBar from "./search-bar/SearchBar";
import Whiskdb from "../../../images/whiskdb.png";
import SortButton from "./sort-button/SortButton";
import FilterButton from "./filter-buttons/FilterButton";

//styles
import "./header-styles.css";

const HomeHeader = () => {
  return (
    <div className="header">
      <SearchBar />
      <img className="whisk-title" src={Whiskdb} alt="Whiskdb logo" />
      <SortButton />
      <FilterButton buttonName="Diet" />
      <FilterButton buttonName="Meal" />
    </div>
  );
};

export default HomeHeader;
