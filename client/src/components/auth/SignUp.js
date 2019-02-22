import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

class SignUp extends Component {
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  renderError({ error, submitFailed }) {
    if (submitFailed && error) {
      return <div className="ui mini red message">{error}</div>;
    }
  }

  renderInput = ({ input, label, meta, placeholder }) => {
    const className = `field ${meta.error && meta.submitFailed ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
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
    return (
      <div className="ui grid">
        <div
          className="fluid column centered"
          style={{
            maxWidth: "31rem"
          }}
        >
          <div className="ui attached message">
            <div className="ui center aligned header">Sign Up</div>
          </div>
          <form
            onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            className="ui form error attached segment"
          >
            <div className="ui center aligned icon header">
              Make an Account! It's Easy.
            </div>
            <Field
              name="username"
              component={this.renderInput}
              label="Username"
              placeholder="Enter a Username"
            />
            <Field
              name="email"
              component={this.renderInput}
              label="Email"
              placeholder="Enter an Eamil Address"
            />
            <Field
              type="password"
              name="password"
              component={this.renderInput}
              label="Password"
              placeholder="Enter a Password"
            />
            <Field
              type="password"
              name="password2"
              component={this.renderInput}
              label="Verify Password"
              placeholder="Enter the same password"
            />
            <button className="ui button blue fluid" type="submit">
              Sign up
            </button>
          </form>
          <div className="ui bottom attached warning message">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.username) {
    errors.username = "You must enter your name";
  }
  if (!formValues.email) {
    errors.email = "You must enter a valid email address";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  if (!formValues.password2) {
    errors.password2 = "You must validate the password";
  } else if (formValues.password2 !== formValues.password) {
    errors.password2 = "Passwords don't match";
  }
  return errors;
};

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

SignUp = connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));

export default reduxForm({
  form: "signup",
  validate: validate
})(SignUp);
