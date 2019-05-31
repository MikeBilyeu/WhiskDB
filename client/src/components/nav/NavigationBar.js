import React from "react";
import { Link } from "react-router-dom";
import "./nav-styles.css";

import { ReactComponent as Home } from "./search.svg";
import { ReactComponent as Saved } from "./saved.svg";
import { ReactComponent as Profile } from "./profile.svg";

const NavigationBar = props => {
  return (
    <div className="navBar">
      <div className="navButton">
        <Link to="/">
          <Home className="navIcon" />
        </Link>
      </div>
      <div className="navButton">
        <Link to="/profile/saved-recipes">
          <Saved className="navIcon" />
        </Link>
      </div>
      <div className="navButton">
        <Link to="/profile">
          <Profile className="navIcon" />
        </Link>
      </div>
    </div>
  );
};
export default NavigationBar;
