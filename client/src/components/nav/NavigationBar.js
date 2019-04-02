import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationBar = props => {
  return (
    <div className="ui inverted fluid three borderless item bottom fixed menu">
      <NavigationButton link="/" icon="home" />
      <NavigationButton link="/profile/saved-recipes" icon="book" />
      <NavigationButton link="/profile" icon="user" />
    </div>
  );
};
export default NavigationBar;
