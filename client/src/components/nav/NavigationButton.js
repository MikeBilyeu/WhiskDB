import React from "react";
import { Link } from "react-router-dom";

const NavigationButton = props => {
  return (
    <Link to={props.link} className="item center">
      <i className={`icon center ${props.icon}`}></i>{props.text}
    </Link>
  );
};

export default NavigationButton;
