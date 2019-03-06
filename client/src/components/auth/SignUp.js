import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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
        <label for={labelFor}>{label}</label>
        <input
          {...input}
          autoComplete="off"
          type={type}
          id={inputId}
          placeholder={placeholder}
        />
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
    const lower = value => value && value.toLowerCase();
    return (
      <div className="ui grid" style={{ margin: "1.5rem 0rem" }}>
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
              Make an Account. It's Easy!
            </div>
            <Field
              name="username"
              component={this.renderInput}
              label="Username"
              inputId="username"
              labelFor="username"
              placeholder="Enter a Username"
            />
            <Field
              name="email"
              component={this.renderInput}
              label="Email"
              inputId="email"
              labelFor="email"
              placeholder="Enter an Eamil Address"
              normalize={lower}
            />
            <Field
              type="password"
              name="password"
              component={this.renderInput}
              label="Password"
              inputId="password"
              labelFor="password"
              placeholder="Enter a Password"
            />

            <Field
              type="password"
              name="password2"
              component={this.renderInput}
              label="Verify Password"
              inputId="password2"
              labelFor="password2"
              placeholder="Verify Password"
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
