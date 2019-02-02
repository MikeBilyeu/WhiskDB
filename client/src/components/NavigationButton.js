import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavigationButton = (props) => {
  return (
    <div className="item">
      <Link className="ui button" to={props.link}>{props.text}</Link>
    </div>
  );
}

export default NavigationButton;
