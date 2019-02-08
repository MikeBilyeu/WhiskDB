import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationBar = props => {
  return (
    <div
      className="ui menu inverted"
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%"
      }}
    >
      <NavigationButton link="/" icon="arrow left icon" />
      <NavigationButton link="/" icon="home icon" />
      <NavigationButton link="/profile" icon="user icon" />
    </div>
  );
};

export default NavigationBar;
