import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/auth";
import { validateSignup } from "../utils/validation";
import asyncValidate from "../utils/async-validation";
import Input from "../../form_inputs/input";
import "../auth.scss";

class Signup extends Component {
  render() {
    const lower = value => value && value.toLowerCase();

    return (
      <form
        className="signup-form"
        onSubmit={this.props.handleSubmit(this.props.registerUser)}
      >
        <h1 className="signup-form__title">
          Make an Account with Zipiwisk.
          <br /> It’s Easy & Free!
        </h1>
        <Field
          name="username"
          component={Input}
          inputId="username"
          placeholder="Username"
          label="Username"
          className="signup-form__input"
        />
        <Field
          name="email"
          component={Input}
          inputId="email"
          placeholder="Enter your email"
          normalize={lower}
          label="Email"
          className="signup-form__input"
        />

        <Field
          name="password"
          component={Input}
          inputId="password"
          placeholder="Enter a password"
          label="Password"
          type="password"
          className="signup-form__input"
        />
        <button className="signup-form__sbmt-btn" type="submit">
          Sign up
        </button>
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
  validate: validateSignup,
  asyncValidate: asyncValidate,
  asyncBlurFields: ["username", "email"]
})(Signup);
