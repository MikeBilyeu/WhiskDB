import React from "react";
import { Link } from "react-router-dom";

const NavigationButton = props => {
  return (
    <Link to={props.link} className="item">
      <i className={`icon center ${props.icon}`} />
      {props.text}
    </Link>
  );
};

export default NavigationButton;
