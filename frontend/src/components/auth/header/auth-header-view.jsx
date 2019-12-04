import React from "react";
import Button from "../../button";
import "./auth-header.scss";

const Header = ({ page, onClick }) => {
  return (
    <div className="auth-header">
      <Button
        className={"button " + (page === "Login" ? "active" : "")}
        onClick={() => onClick("Login")}
      >
        Login
      </Button>

      <Button
        className={"button " + (page === "Signup" ? "active" : "")}
        onClick={() => onClick("Signup")}
      >
        Signup
      </Button>
    </div>
  );
};

export default Header;
