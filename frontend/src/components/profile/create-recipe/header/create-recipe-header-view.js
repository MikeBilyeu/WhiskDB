import React from "react";
import { ReactComponent as Arrow } from "../../../../assets/images/arrowLeft.svg";

const Header = props => {
  console.log(props);
  return (
    <div className="header">
      <Arrow style={{ width: "2rem" }} onClick={props.onClick} />
      <h1>Create Recipe</h1>
    </div>
  );
};

export default Header;
