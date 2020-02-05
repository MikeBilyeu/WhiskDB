import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFilterButton } from "../../../actions/browseActions";
import SortButton from "../../sort_button";
import CategoryButton from "../../category_button";
import SearchBar from "../../search_bar";
import Logo from "../../../assets/images/zipiwisk-logo.png";
import FilterResults from "../../filter_results";

import "./home-header.scss";

const Header = ({
  filterRecipes,
  buttonToggled,
  handleClick,
  toggleFilterButton
}) => {
  const mealBtnActive = buttonToggled === "Meal";
  const sortBtnActive = buttonToggled === "Sort";
  const { meal, sort } = filterRecipes;

  return (
    <header className="header">
      <div className="mobile">
        <SortButton
          onClick={() => toggleFilterButton("Sort")}
          sortActive={sortBtnActive}
          sortBy={sort}
          className="sort-btn"
        />
        {/*<SearchBar />*/}
        <CategoryButton
          className="categoryBtn"
          active={mealBtnActive}
          name={meal === "All Meals" ? "Categories" : meal}
          selected={meal !== "All Meals"}
          handleClick={() => toggleFilterButton("Meal")}
        />
      </div>

      <div className="desktop">
        <Link to="/">
          <img src={Logo} className="logo" alt="zipiwisk logo" />
        </Link>
        <SearchBar />
        <div className="auth-btns">
          <Link to="/profile">
            <span className="login-btn">Login</span>
          </Link>
          <Link to="/profile">
            <span className="signup-btn">Signup free</span>
          </Link>
        </div>
        <FilterResults
          filterRecipes={filterRecipes}
          handleClick={handleClick}
          buttonToggled="Meal"
        />
        <SortButton
          onClick={() => toggleFilterButton("Sort")}
          sortActive={sortBtnActive}
          sortBy={sort}
          className="sort-btn"
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  filterRecipes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeFilterBtn: PropTypes.string.isRequired,
  toggleFilterButton: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleFilterButton }
)(Header);
