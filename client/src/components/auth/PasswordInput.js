import React, { Component } from "react";

export class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      togglePassword: true
    };
  }
  handleClick = () => {
    this.setState(prevState => {
      return { togglePassword: !prevState.togglePassword };
    });
  };
  render() {
    const {
      input,
      meta: { touched, error, warning, active },
      placeholder,
      inputId,
      label
    } = this.props;

    return (
      <div style={{ position: "relative" }}>
        <label
          style={{
            padding: "0 .5rem",
            backgroundColor: "#FFF",
            position: "absolute",
            left: ".8rem",
            bottom: "2.4rem",
            color: active ? "#0172C4" : "#535662",
            fontWeight: "normal"
          }}
        >
          {label}
        </label>
        <input
          style={{
            border: active ? "solid #0172C4 .07rem " : "solid #AFAFAF .07rem",
            paddingRight: "4.5rem"
          }}
          {...input}
          autoComplete="off"
          type={this.state.togglePassword ? "password" : "text"}
          id={inputId}
          placeholder={placeholder}
        />
        <div
          style={{
            position: "absolute",
            bottom: ".1rem",
            right: ".1rem",
            padding: "1rem 1.5rem .7rem .5rem",
            cursor: "pointer",
            color: "#535662"
          }}
          onClick={this.handleClick}
        >
          {this.state.togglePassword ? "show" : "hide"}
        </div>
        {touched && error ? (
          <div style={{ position: "absolute", color: "red" }}>*{error}</div>
        ) : null}
      </div>
    );
  }
}
