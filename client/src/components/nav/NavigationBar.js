import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationBar = props => {
  return (
    <div className="ui attached stackable menu">
    <div className="ui container">
      <NavigationButton link='/' icon='arrow left' text='Back' />
      <NavigationButton link='/' icon='home' text='Home' />
      <NavigationButton link='/profile' icon='user' text='Profile' />
    </div>
  </div>
  );
};

export default NavigationBar;
