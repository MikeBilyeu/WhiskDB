import React from "react";

// Components
import { Button } from "../../Button";
import { ReactComponent as Arrow } from "../../../images/arrowLeft.svg";

const Header = props => {
  return (
    <div className="cr-header">
      <Arrow className="back-btn" onClick={() => props.onBackClick()} />
      <h1>Create Recipe</h1>
      <Button onClick={() => props.onSaveClick()} className="save-recipe-btn">
        Save
      </Button>
    </div>
  );
};

export default Header;
