import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Arrow } from "../recipes/recipe-display/arrow.svg";

const Button = props => {
  return (
    <Link to={props.linkTo} className="profile-btn">
      <div className="profile-link">
        <div>{props.text}</div>
        <Arrow style={{ width: "1rem", justifySelf: "end" }} />
      </div>
    </Link>
  );
};

export default Button;
