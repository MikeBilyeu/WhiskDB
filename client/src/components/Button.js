import React from "react";
import { Link } from "react-router-dom";

const Button = props => {
  return (
    <Link to={props.linkTo}>
      <button className="ui button" style={{ width: "20rem" }}>
        {props.text}
      </button>
    </Link>
  );
};

export default Button;
