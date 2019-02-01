import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavigationButton = (props) => {
  return (
    <div class="item">
      <Link class="ui button" to={props.link}>{props.text}</Link>
    </div>
  );
}

export default NavigationButton;
