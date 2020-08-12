import React from "react";
import { Field, reduxForm } from "redux-form";
import { validateLogin } from "../utils/validation";
import Input from "../../form_inputs/input";

const Login = props => {
  const lower = value => value && value.toLowerCase();
  return (
    <form className="login-form" onSubmit={props.handleSubmit(props.loginUser)}>
      <h1 className="login-form__title">
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
        className="login-form__input"
      />

      <Field
        name="password"
        component={Input}
        inputId="password"
        placeholder="Enter your password"
        label="Password"
        type="password"
        className="login-form__input"
      />
      <button className="signup-form__sbmt-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default reduxForm({
  form: "login",
  validate: validateLogin
})(Login);
