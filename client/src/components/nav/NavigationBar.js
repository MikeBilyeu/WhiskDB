import React from "react";
import NavigationButton from "./NavigationButton";
import { withRouter } from "react-router";

const NavigationBar = props => {
  return (
    <div className="ui inverted fluid three borderless item bottom fixed menu">
      <a
        className="item"
        onClick={() => props.history.goBack()}
        style={{ border: "none", cursor: "pointer" }}
      >
        <i className="icon large arrow left" />
        Back
      </a>
      <NavigationButton link="/" icon="home" text="Home" />
      <NavigationButton link="/profile" icon="user" text="Profile" />
    </div>
  );
};

export default withRouter(NavigationBar);
