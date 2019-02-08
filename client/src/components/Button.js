import React from "react";
import { Link } from "react-router-dom";

const Button = props => {
  return (
    <Link className="ui active button" to={props.linkTo}>
      {props.text}
    </Link>
  );
};

export default Button;
