import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui inverted fluid one huge borderless item huge top fixed menu">
      <Link to="/" className="item">
        WhiskDB
      </Link>
    </div>
  );
};

export default Header;
