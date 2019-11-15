import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import { validateSignup } from "../utils/validation";
import asyncValidate from ".utils/async-validation";
import Input from "../../form-inputs/input";
import Button from "../../button";
import "./auth-signup.scss";

class Signup extends Component {
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
        className="auth-form signup"
        onSubmit={this.props.handleSubmit(this.props.registerUser)}
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
        <Button onClick={this.handleClick}>
          {this.state.showPassword ? "hide" : "show"}
        </Button>
        <Field
          name="password"
          component={Input}
          inputId="password"
          placeholder="Enter a password"
          label="Password"
          type={this.state.showPassword ? "text" : "password"}
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
  validate: validateSignup,
  asyncValidate: asyncValidate,
  asyncBlurFields: ["username", "email"]
})(Signup);
