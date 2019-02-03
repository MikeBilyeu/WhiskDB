import React from 'react';

class Login extends React.Component {
  state = { email: '', password: '' };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value});
  }

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value});
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    console.log('onFormSubit');
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.onFormSubmit}>
        <h2 className="ui center aligned icon header">
          <i className="user circle icon"></i>
          Login
        </h2>
        <div className="field">
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.onEmailChange}
            type="text"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.onPasswordChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button className="ui button blue" type="submit">Login</button>
      </form>
    );
  }
}

export default Login;
