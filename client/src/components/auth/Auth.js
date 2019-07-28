import React from "react";
import "./auth-styles.css";
import Login from "./Login";
import SignUp from "./SignUp";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }
  componentDidMount() {
    // If logged in and user auth redirect to profile
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // push user to profile when they login
      this.props.history.push("/profile");
    }
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Auth));

// single component that renders auth or login by setAuthToken
