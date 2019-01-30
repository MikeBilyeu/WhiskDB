import React from 'react';

class InputField extends React.Component {
  state = { value: '' }

  onInputChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onInputChange(this.props.stateKey, event.target.value);
  }
  
  render() {
    return (
      <div className="field">
        <label>{this.props.inputLabel}</label>
        <input
          type={this.props.inputType}
          value={this.state.value}
          onChange={ this.onInputChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default InputField;
