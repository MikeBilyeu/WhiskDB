import React from "react";
import { Link } from "react-router-dom";

const NavigationButton = props => {
  return (
    <Link to={props.link}>
      <button className="ui icon button">
        <i className={props.icon} />
      </button>
    </Link>
  );
};

export default NavigationButton;
