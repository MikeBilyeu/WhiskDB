import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFilterButton } from "../../../actions/browseActions";
import SortButton from "../../sort_button";
import CategoryButton from "../../category_button";
import SearchBar from "../../search_bar";
import Logo from "../../../assets/images/zipiwisk-logo.png";
import userLogo from "../../../assets/images/profileLogo.png";
import FilterResults from "../../filter_results";

import "./home-header.scss";

const Header = ({
  filterRecipes,
  buttonToggled,
  handleClick,
  toggleFilterButton,
  isAuth,
  user_img
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
        <Link to="/" onClick={() => window.location.reload()}>
          <img src={Logo} className="logo" alt="zipiwisk logo" />
        </Link>
        <SearchBar />
        <div className="auth-btns">
          <Link to="/profile" style={{ display: isAuth && "none" }}>
            <span className="login-btn">Login</span>
          </Link>
          <Link to="/profile" style={{ display: isAuth && "none" }}>
            <span className="signup-btn">Signup free</span>
          </Link>
          <Link
            to="/profile/create-recipe"
            className="create-recipe-btn"
            style={{ display: !isAuth && "none" }}
          >
            Create Recipe
          </Link>
          <Link
            to="/profile"
            className="profile-button"
            style={{ display: !isAuth && "none" }}
          >
            <img src={user_img || userLogo} alt="user profile" />
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
  toggleFilterButton: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default connect(
  null,
  { toggleFilterButton }
)(Header);
