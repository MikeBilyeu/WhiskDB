import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Signup extends Component {
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  renderInput = ({ input, meta, placeholder, inputId, type = "text" }) => {
    const className = `field ${meta.error && meta.submitFailed ? "error" : ""}`;
    return (
      <input
        {...input}
        autoComplete="off"
        type={type}
        id={inputId}
        placeholder={placeholder}
      />
    );
  };

  onFormSubmit = formValues => {
    console.log(formValues);
    const newUser = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      password2: formValues.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const lower = value => value && value.toLowerCase();
    return (
      <form
        className="authForm signup"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
      >
        <h1>Make an Account. It's Easy!</h1>
        <label>
          Username
          <Field
            name="username"
            component={this.renderInput}
            inputId="username"
            placeholder="Username"
          />
        </label>

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
            type="password"
            name="password"
            component={this.renderInput}
            inputId="password"
            placeholder="Password"
          />
        </label>

        <label>
          Verify Password
          <Field
            type="password"
            name="password2"
            component={this.renderInput}
            inputId="password2"
            placeholder="Verify Password"
          />
        </label>
        <button type="submit">Sign up</button>
      </form>
    );
  }
}

const validate = formValues => {
  // let userNameRegEx = /^(?=.{2,20}$)(?![_])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_])$/;
  let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  let passwordRegEx = /^\S{8,30}$/;
  const errors = {};
  //
  // if (!formValues.username) {
  //   errors.username = "You must enter a username";
  // } else if (!userNameRegEx.test(formValues.username)) {
  //   errors.username = "Username must be 3-20 alphanumeric characters";
  // }
  if (!formValues.email) {
    errors.email = "You must email address";
  } else if (!emailRegEx.test(formValues.email)) {
    errors.email = "Email is invalid";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  } else if (!passwordRegEx.test(formValues.passpord)) {
    errors.password = "Password must be 6 - 30 characters";
  }
  if (!formValues.password2) {
    errors.password2 = "You must validate the password";
  } else if (formValues.password2 !== formValues.password) {
    errors.password2 = "Passwords don't match";
  }
  return errors;
};

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  // errors: state.errors
});

Signup = connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));

export default reduxForm({
  form: "Signup",
  validate: validate
})(Signup);
