import React from 'react';
import NavigationButton from './NavigationButton';

const NavigationBar = (props) => {
  return (
    <div class="ui menu inverted" style={
      {
      position: 'fixed',
      bottom: '0',
      width: '100%'
    }}>
      <NavigationButton link="/" text="Home" />
      <NavigationButton link="/profile" text="Profile" />
    </div>
  );
}

export default NavigationBar;
