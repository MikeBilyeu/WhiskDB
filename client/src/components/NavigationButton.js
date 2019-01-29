import React from 'react';

class NavigationButton extends React.Component {

  onButtonClick = () => {
    this.props.onNavClick(this.props.page);

  }

  render() {
    return <button onClick={this.onButtonClick}>{this.props.page}</button>;
  }


}

export default NavigationButton;
