import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import SearchBar from "../search_bar";
import Logo from "../../assets/images/zipiwisk-logo.png";
import userLogo from "../../assets/images/profileLogo.png";
import "./header_desktop.scss";

const HeaderDesktop = props => {
  const handleLogoClick = () => {
    return props.location.pathname === "/" ? window.location.reload() : true;
  };

  return (
    <header className="header-d">
      <Link to="/" onClick={handleLogoClick} className="header-d__logo">
        <img src={Logo} alt="zipiwisk logo" />
      </Link>

      <SearchBar />

      <div className="auth-btns">
        {!props.isAuth ? (
          <>
            <Link className="auth-btns__login" to="/auth/login">
              Login
            </Link>
            <Link className="auth-btns__signup" to="/auth/signup">
              Signup free
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="auth-btns__home">
              Home
            </Link>
            <Link to="/profile/create-recipe" className="auth-btns__create">
              Create Recipe
            </Link>
            <Link to="/profile" className="auth-btns__profile">
              <img src={props.user_img || userLogo} alt="user profile" />
            </Link>
          </>
        )}
      </div>
      {props.children}
    </header>
  );
};

HeaderDesktop.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user_img: PropTypes.string
};

export default withRouter(HeaderDesktop);
