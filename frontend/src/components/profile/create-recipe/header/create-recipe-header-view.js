import React from "react";
import { ReactComponent as Arrow } from "../../../../assets/images/arrowLeft.svg";
import "./create-recipe-header.scss";

const Header = props => {
  return (
    <div className="header">
      <Arrow className="back-btn" onClick={props.onClick} />
      <h1>Create Recipe</h1>
    </div>
  );
};

export default Header;
