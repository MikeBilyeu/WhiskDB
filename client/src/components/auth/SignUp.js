import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  // onInputChange = e => {
  //   if (e.target.id === "name") {
  //     // let nameInput = e.target.value.toLowerCase().split(" ");
  //     // let nameCap = nameInput
  //     //   .map(word => {
  //     //     return word.charAt(0).toUpperCase() + word.slice(1);
  //     //   })
  //     //   .join(" ");
  //     this.props.signup(this.props.signupInfo);
  //     // this.setState({ [e.target.id]: nameCap });
  //   } else {
  //     this.setState({ [e.target.id]: e.target.value });
  //   }
  // };

  // onFormSubmit = event => {
  //   event.preventDefault();
  //   const newUser = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     password: this.state.password,
  //     password2: this.state.password2
  //   };
  //
  //   console.log(newUser);
  // };
  render() {
    console.log(this.props);
    const { errors } = this.state;
    return (
      <form noValidate className="ui form" /*onSubmit={this.onFormSubmit}*/>
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
        <div className="field">
          <label>Full Name</label>
          <input
            id="name"
            value={this.state.name}
            onChange={this.onInputChange}
            type="text"
            error={errors.name}
            placeholder="First Last"
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            id="email"
            value={this.state.email}
            onChange={this.onInputChange}
            type="text"
            error={errors.email}
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            id="password"
            value={this.state.Password}
            onChange={this.onInputChange}
            type="password"
            error={errors.password}
            placeholder="Password"
          />
        </div>
        <div className="field">
          <label>Verify Password</label>
          <input
            id="password2"
            value={this.state.Password2}
            onChange={this.onInputChange}
            type="password"
            error={errors.password2}
            placeholder="Password"
          />
        </div>
        <button className="ui button blue" type="submit">
          Sign up
        </button>
      </form>
    );
  }
}

export default SignUp;
