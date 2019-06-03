import React from "react";
import "./auth-styles.css";
import Login from "./Login";
import SignUp from "./SignUp";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  handleLoginClick = () => {
    this.setState({ login: true });
  };
  handleSignUpClick = () => {
    this.setState({ login: false });
  };
  render() {
    return (
      <div>
        <div className="authHeader">
          <div
            className={"authButton " + (this.state.login ? "active" : "")}
            onClick={this.handleLoginClick}
          >
            Login
          </div>
          <div
            className={"authButton " + (!this.state.login ? "active" : "")}
            onClick={this.handleSignUpClick}
          >
            Signup
          </div>
        </div>
        {this.state.login ? <Login /> : <SignUp />}
      </div>
    );
  }
}

export default Auth;

// single component that renders auth or login by setAuthToken
