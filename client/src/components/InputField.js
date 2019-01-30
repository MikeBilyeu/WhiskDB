import React from 'react';

class InputField extends React.Component {
  state = { value: '' }

  onInputChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onInputChange(this.props.stateKey, event.target.value);
  }

  render() {
    if(this.props.inputType !== 'textArea') {
      return (
        <div className="field twelve wide required">
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
    return (

        <div className="field twelve wide required">
        <label>{this.props.inputLabel}</label>
        <textarea
        value={this.state.value}
        onChange={ this.onInputChange}
        placeholder={this.props.placeholder}
        style={{marginTop: "0px", marginBottom: "0px", height: "115px"}}
        ></textarea>
        </div>
    );

  }
}

export default InputField;
