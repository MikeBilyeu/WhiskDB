import React from "react";
import { Link } from "react-router-dom";
import "./auth-header.scss";

const Header = () => {
  return (
    <div className="auth-header">
      <Link to="/auth/login" className="auth-header__btn">
        Login
      </Link>
      <Link to="/auth/signup" className="auth-header__btn">
        Signup
      </Link>
    </div>
  );
};

export default Header;
