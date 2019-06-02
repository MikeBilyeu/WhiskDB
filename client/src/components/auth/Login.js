import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import "./auth-styles.css";

class Login extends Component {
  componentDidMount() {
    // If logged in and user navigates to Login page, navigate back to profile
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // push user to profile when they login
      this.props.history.push("/profile");
    }
  }

  renderInput = ({ input, meta, placeholder, inputId, type = "text" }) => {
    const className = `field ${meta.error && meta.submitFailed ? "error" : ""}`;
    return (
      <input
        {...input}
        id={inputId}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
      />
    );
  };

  onFormSubmit = formValues => {
    const userData = {
      email: formValues.email,
      password: formValues.password
    };
    this.props.loginUser(userData);
    // since we handle the redirect within our component,
    // we don't need to pass in this.props.history as a parameter
  };

  render() {
    const lower = value => value && value.toLowerCase();
    return (
      <form
        className="authForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
      >
        <label>
          Email
          <Field
            name="email"
            component={this.renderInput}
            inputId="email"
            placeholder="Email Address"
            normalize={lower}
          />
        </label>
        <label>
          Password
          <Field
            name="password"
            component={this.renderInput}
            inputId="password"
            type="password"
            placeholder="Password"
          />
        </label>

        <button type="submit">Log in</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Please Enter Email Address";
  }
  if (!formValues.password) {
    errors.password = "Please Enter Password";
  }
  return errors;
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  // errors: state.errors
});

Login = connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));

export default reduxForm({
  form: "login",
  validate: validate
})(Login);
