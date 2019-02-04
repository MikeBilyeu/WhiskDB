import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };

  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log("onFormSubit");

    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginData);
  };

  render() {
    const { errors } = this.state;
    return (
      <form noValidate className="ui form" onSubmit={this.onFormSubmit}>
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
        <div className="field">
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.onInputChange}
            type="text"
            id="email"
            placeholder="Email"
            errors={errors.email}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.onInputChange}
            type="password"
            id="password"
            placeholder="Password"
            errors={errors.password}
          />
        </div>
        <button className="ui button blue" type="submit">
          Log in
        </button>
      </form>
    );
  }
}

export default Login;
