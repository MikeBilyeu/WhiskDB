import React from "react";
import { ReactComponent as Arrow } from "../../../../assets/images/arrowLeft.svg";

const Header = props => {
  return (
    <header className="create-recipe-header">
      <Arrow
        className="create-recipe-header__back-btn"
        onClick={props.onClick}
      />
      <h1 className="create-recipe-header__title">Create Recipe</h1>
    </header>
  );
};

export default Header;
