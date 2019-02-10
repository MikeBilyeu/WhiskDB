import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui inverted fluid massive borderless item top fixed menu">
      <Link to="/" className="item">
        <h1>WhiskDB</h1>
      </Link>
    </div>
  );
};

export default Header;
