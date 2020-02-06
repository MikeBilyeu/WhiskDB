import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFilterButton } from "../../../actions/browseActions";
import { SortButtonDesktop } from "../../sort_button";
import SearchBar from "../../search_bar";
import Logo from "../../../assets/images/zipiwisk-logo.png";
import userLogo from "../../../assets/images/profileLogo.png";
import FilterResults from "../../filter_results";

import "./home-header_desktop.scss";

const HeaderDesktop = ({
  filterRecipes,
  buttonToggled,
  handleClick,
  toggleFilterButton,
  isAuth,
  user_img
}) => {
  const { sort } = filterRecipes;
  return (
    <header className="header-d">
      <Link to="/" onClick={() => window.location.reload()}>
        <img src={Logo} className="header-d__logo" alt="zipiwisk logo" />
      </Link>

      <SearchBar />

      <div className="auth-btns">
        {!isAuth ? (
          <>
            <Link to="/auth" className="auth-btns__login">
              Login
            </Link>
            <Link to="/auth" className="auth-btns__signup">
              Signup free
            </Link>
          </>
        ) : null}

        {isAuth ? (
          <>
            <Link
              to="/"
              onClick={() => window.location.reload()}
              className="auth-btns__home"
            >
              Home
            </Link>
            <Link to="/profile/create-recipe" className="auth-btns__create">
              Create Recipe
            </Link>
            <Link to="/profile" className="auth-btns__profile">
              <img src={user_img || userLogo} alt="user profile" />
            </Link>
          </>
        ) : null}
      </div>

      <FilterResults
        filterRecipes={filterRecipes}
        handleClick={handleClick}
        buttonToggled="Meal"
      />
      <SortButtonDesktop
        onClick={() => toggleFilterButton("Sort")}
        sortBy={sort}
      />
    </header>
  );
};

HeaderDesktop.propTypes = {
  filterRecipes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  user_img: PropTypes.string
};

export default connect(
  null,
  { toggleFilterButton }
)(HeaderDesktop);
