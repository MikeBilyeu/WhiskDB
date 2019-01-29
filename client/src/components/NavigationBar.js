import React from 'react';
import NavigationButton from './NavigationButton';

const NavigationBar = (props) => {
  return (
    <nav className="ui block inverted header center aligned" style={
      {
      position: 'absolute',
      width: '100%',
      bottom: '0'
    }
  }>
    <NavigationButton onNavClick={props.onNavClick} page="home" />
    <NavigationButton onNavClick={props.onNavClick} page="profile" />
    </nav>
  );
}

export default NavigationBar;
