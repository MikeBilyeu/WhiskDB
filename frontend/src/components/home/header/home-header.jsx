import React from "react";
import { connect } from "react-redux";
import SortButton from "../../sort_button";
import CategoryButton from "../../category_button";
import SearchBar from "../../search_bar";
import { toggleFilterBtnBrowse } from "../../../actions/browse";

import "./home-header.scss";

const Header = ({ meal, activeFilterBtn, toggleFilterBtnBrowse }) => {
  return (
    <header className="header">
      <SortButton className="sort-btn-m" />
      <CategoryButton
        className="category-btn-m"
        meal={meal}
        activeFilterBtn={activeFilterBtn}
        toggleFilterButton={toggleFilterBtnBrowse}
      />
      {/*<SearchBar />*/}
    </header>
  );
};

const mapSateToProps = state => ({
  meal: state.browseRecipes.filterRecipes.meal,
  activeFilterBtn: state.browseRecipes.activeFilterBtn
});

export default connect(
  mapSateToProps,
  { toggleFilterBtnBrowse }
)(Header);
