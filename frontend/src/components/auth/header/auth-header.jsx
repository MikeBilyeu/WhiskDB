import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./auth-header.scss";

const Header = props => {
  return (
    <div className="auth-header">
      <Link
        to="/auth/login"
        className={classNames("auth-header__btn", {
          "auth-header__btn--active": props.path !== "/auth/signup"
        })}
      >
        Login
      </Link>
      <Link
        to="/auth/signup"
        className={classNames("auth-header__btn", {
          "auth-header__btn--active": props.path === "/auth/signup"
        })}
      >
        Signup
      </Link>
    </div>
  );
};

export default Header;
