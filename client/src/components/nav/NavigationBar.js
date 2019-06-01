import React from "react";
import { Link } from "react-router-dom";
import "./nav-styles.css";

import { ReactComponent as Home } from "./search.svg";
import { ReactComponent as Saved } from "./saved.svg";
import { ReactComponent as Profile } from "./profile.svg";

const NavigationBar = props => {
  return (
    <div className="navBar">
      <Link to="/profile/saved-recipes">
        <Saved className="navIcon" />
      </Link>

      <Link to="/">
        <Home className="navIcon" />
      </Link>

      <Link to="/profile">
        <Profile className="navIcon" />
      </Link>
    </div>
  );
};
export default NavigationBar;
