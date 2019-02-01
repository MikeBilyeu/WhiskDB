import React from 'react';

class SignUp extends React.Component {
  state = { username: '', password: '' }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value});
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log('sign up form, Username: ');
    console.log(this.state.username);

  }
  render() {
    return (
      <form className="ui form" onSubmit={this.onFormSubmit}>
        <h2 className="ui center aligned icon header">
          <i className="user circle icon"></i>
          Sign up
        </h2>
        <div className="field">
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.onUsernameChange}
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.onPasswordChange}
            type="Password"
            name="Password"
            placeholder="Password"
          />
        </div>
        <button className="ui button blue" type="submit">Sign up</button>
      </form>
    );
  }
}

export default SignUp;
