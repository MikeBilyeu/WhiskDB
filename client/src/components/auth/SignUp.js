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

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div>{error}</div>
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
        <input {...input} autoComplete="off" placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
    );
  };

  onFormSubmit = formValues => {
    console.log(formValues);

    // axios
    //   .post("/register", {
    //     username: formValues.username,
    //     email: formValues.email,
    //     password: formValues.password,
    //     password2: formValues.password2
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log("onFormSubmit err", error);
    //   });

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
        <button className="ui button blue" type="submit">
          Sign up
        </button>
      </form>
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
