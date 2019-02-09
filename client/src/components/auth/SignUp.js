import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

class SignUp extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, placeholder }) => {
    const className = `field twelve wide ${
      meta.error && meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          placeholder={label}
          autoComplete="off"
          placeholder={placeholder}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onFormSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form error"
      >
        <Link to="/" className="ui button">
          Back to Home
        </Link>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <h2 className="ui center aligned icon header">
          <i className="user circle icon" />
          Sign up
        </h2>
        <Field
          name="name"
          component={this.renderInput}
          label="Full Name"
          placeholder="First & Last"
        />
        <Field
          name="email"
          component={this.renderInput}
          label="Email"
          placeholder="Eamil Address"
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
        <button className="ui button blue" type="submit">
          Sign up
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "You must enter your name";
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

export default reduxForm({
  form: "signup",
  validate: validate
})(SignUp);
