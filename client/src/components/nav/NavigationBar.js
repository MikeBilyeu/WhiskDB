import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationBar = props => {
  return (
    <div className="ui inverted fluid three borderless item bottom fixed menu">
      <NavigationButton link="/" icon="arrow left" text="Back" />
      <NavigationButton link="/" icon="home" text="Home" />
      <NavigationButton link="/profile" icon="user" text="Profile" />
    </div>
  );
};

export default NavigationBar;
