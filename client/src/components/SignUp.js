import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  }

  onFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value});
  }
  onLastNameChange = (event) => {
    this.setState({ lastName: event.target.value});
  }
  onEmailChange = (event) => {
    this.setState({ email: event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value});
  }
  onPassword2Change = (event) => {
    this.setState({ password2: event.target.value});
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log('onFormSubit');
    axios.post("http://localhost:3001/sign-up", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }).then(res => {
      if(res.data) {
        console.log('success');
        console.log(res.data);
      } else {
        console.log('ERROR');
      }
    }).catch(err => {
      console.log(err)
    });

  }
  render() {
    return (
      <form className="ui form" onSubmit={this.onFormSubmit}>
        <h2 className="ui center aligned icon header">
          <i className="user circle icon"></i>
          Sign up
        </h2>
        <div className="field">
          <label>First Name</label>
          <input
            value={this.state.username}
            onChange={this.onFirstNameChange}
            type="text"
            name="first"
            placeholder="First"
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            value={this.state.lastName}
            onChange={this.onLastNameChange}
            type="text"
            name="last"
            placeholder="Last"
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.onEmailChange}
            type="text"
            name="eamil"
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.Password}
            onChange={this.onPasswordChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="field">
          <label>Verify Password</label>
          <input
            value={this.state.Password2}
            onChange={this.onPassword2Change}
            type="password"
            name="password2"
            placeholder="Password"
          />
        </div>
        <button className="ui button blue" type="submit">Sign up</button>
      </form>
    );
  }
}

export default SignUp;
