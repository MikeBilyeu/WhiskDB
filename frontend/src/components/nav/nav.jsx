import React, { useState, useEffect } from "react";
import classNames from "classnames";
import MediaQuery from "react-responsive";
import { Link, withRouter } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../assets/images/search.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/profile.svg";

import "./nav.scss";

const Nav = props => {
  const [navLoaction, setNavLocation] = useState("");
  const pathname = props.location.pathname;

  const testPathname = () => {
    if (/^\/recipe*/.test(pathname)) {
      setNavLocation("recipe");
    } else if (/profile|auth/.test(pathname)) {
      setNavLocation("profile");
    } else {
      setNavLocation("home");
    }
  };

  useEffect(testPathname, [pathname]);

  return (
    navLoaction !== "recipe" && (
      <MediaQuery maxDeviceWidth={649}>
        <div className="nav-bar">
          <Link to="/" className="nav-bar__link">
            <HomeIcon
              className={classNames("nav-bar__icon", {
                "nav-bar__icon--active": navLoaction === "home"
              })}
            />
          </Link>

          <Link to="/profile" className="nav-bar__link">
            <ProfileIcon
              className={classNames("nav-bar__icon", {
                "nav-bar__icon--active": navLoaction === "profile"
              })}
            />
          </Link>
        </div>
      </MediaQuery>
    )
  );
};

export default withRouter(Nav);
