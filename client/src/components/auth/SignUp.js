import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { ValidateSignup } from "./authValidation";
import asyncValidate from "./asyncValidation";

import { PasswordInput } from "./PasswordInput";
import { Input } from "./Input";

class Signup extends Component {
  onFormSubmit = formValues => {
    const newUser = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      password2: formValues.password2
    };
    this.props.registerUser(newUser);
    // since we handle the redirect within our component,
    // we don't need to pass in this.props.history as a parameter
  };

  render() {
    const lower = value => value && value.toLowerCase();

    return (
      <form
        className="authForm signup"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
      >
        <h1>Make an Account. It's Easy!</h1>

        <Field
          name="username"
          component={Input}
          inputId="username"
          placeholder="Username"
          label="Username"
        />

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
          placeholder="Enter a password"
          label="Password"
        />

        <button type="submit">Sign up</button>
      </form>
    );
  }
}

Signup = connect(
  null,
  { registerUser }
)(Signup);

export default reduxForm({
  form: "Signup",
  validate: ValidateSignup,
  asyncValidate: asyncValidate,
  asyncBlurFields: ["username", "email"]
})(Signup);
