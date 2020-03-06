import React from "react";
import { connect } from "react-redux";
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
              <img src={props.userImg || userLogo} alt="user profile" />
            </Link>
          </>
        )}
      </div>
      {props.children}
    </header>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  userImg: state.auth.user.image_url
});

export default withRouter(connect(mapStateToProps)(HeaderDesktop));
