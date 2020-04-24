import React from "react";
import { connect } from "react-redux";
import SortButton from "../../sort_button";
import CategoryButton from "../../category_button";
import SearchBar from "../../search_bar";
import { toggleFilterBtnBrowse } from "../../../actions/browse";

import "./home-header.scss";

const Header = ({
  category,
  search,
  activeFilterBtn,
  toggleFilterBtnBrowse
}) => {
  return (
    <header className="header">
      <SortButton className="sort-btn-m" />
      <CategoryButton
        className="category-btn-m"
        category={category}
        search={search}
        active={activeFilterBtn === "Category"}
        toggleFilterButton={toggleFilterBtnBrowse}
      />
      <SearchBar />
    </header>
  );
};

const mapSateToProps = state => ({
  category: state.browseRecipes.filterRecipes.category,
  search: state.browseRecipes.filterRecipes.search,
  activeFilterBtn: state.browseRecipes.activeFilterBtn
});

export default connect(
  mapSateToProps,
  { toggleFilterBtnBrowse }
)(Header);
