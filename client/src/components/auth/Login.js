import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { ValidateLogin } from "./AuthValidation";

import { Input } from "../form-inputs/Input";
import { Button } from "../Button";

import "./auth-styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  handleClick = () => {
    this.setState(prevState => {
      return { showPassword: !prevState.showPassword };
    });
  };
  render() {
    const lower = value => value && value.toLowerCase();
    return (
      <form
        className="authForm"
        onSubmit={this.props.handleSubmit(this.props.loginUser)}
      >
        <h1>
          Already Have an Account?
          <br />
          Just Login!
        </h1>
        <Field
          name="email"
          component={Input}
          inputId="email"
          placeholder="Enter your email"
          normalize={lower}
          label="Email"
        />
        <Button onClick={this.handleClick}>
          {this.state.showPassword ? "hide" : "show"}
        </Button>
        <Field
          name="password"
          component={Input}
          inputId="password"
          placeholder="Enter your password"
          label="Password"
          type={this.state.showPassword ? "text" : "password"}
        />
        <button type="submit">Log in</button>
      </form>
    );
  }
}

Login = connect(
  null,
  { loginUser }
)(Login);

export default reduxForm({
  form: "login",
  validate: ValidateLogin,
  destroyOnUnmount: false
})(Login);
