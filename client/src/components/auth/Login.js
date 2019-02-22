import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile"); // push user to dashboard when they login
    }
  }

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

  onFormSubmit = formValues => {
    console.log(formValues);
    // axios
    //   .post("/login", {
    //     email: formValues.email,
    //     password: formValues.password
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log("onFormSubmit err", error);
    //   });
    const userData = {
      email: formValues.email,
      password: formValues.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

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
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
        <h2 className="ui center aligned icon header">
          <i className="user circle icon" />
          Login
        </h2>
        <Field
          name="email"
          component={this.renderInput}
          label="Email"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={this.renderInput}
          label="Password"
          placeholder="Password"
        />
        <button className="ui button blue" type="submit">
          Log in
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Please Enter your Email Address";
  }
  if (!formValues.password) {
    errors.password = "Please Enter your Password";
  }
  return errors;
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Login = connect(
  mapStateToProps,
  { loginUser }
)(Login);

export default reduxForm({
  form: "login",
  validate: validate
})(Login);
