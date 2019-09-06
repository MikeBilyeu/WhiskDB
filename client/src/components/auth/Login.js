import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { ValidateLogin } from "./AuthValidation";

import { PasswordInput } from "./PasswordInput";
import { Input } from "./Input";

import "./auth-styles.css";

class Login extends Component {
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

        <Field
          name="password"
          component={PasswordInput}
          inputId="password"
          placeholder="Enter your password"
          label="Password"
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
