import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

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

  renderInput = ({
    input,
    label,
    labelFor,
    meta,
    placeholder,
    inputId,
    type = "text"
  }) => {
    const className = `field ${meta.error && meta.submitFailed ? "error" : ""}`;
    return (
      <div className={className}>
        <label htmlFor={labelFor}>{label}</label>
        <input
          {...input}
          id={inputId}
          autoComplete="off"
          type={type}
          placeholder={placeholder}
        />
      </div>
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
      <div style={{ margin: "5rem 0rem" }}>
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <Field
            name="email"
            component={this.renderInput}
            label="Email"
            labelFor="email"
            inputId="email"
            placeholder="Email Address"
            normalize={lower}
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
            labelFor="password"
            inputId="password"
            type="password"
            placeholder="Password"
          />
          <button type="submit">Log in</button>
        </form>
      </div>
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
