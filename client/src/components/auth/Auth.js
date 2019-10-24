import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import { Button } from "../Button";

import "./auth-styles.css";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Login"
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

  handleClick = page => {
    this.setState({ page });
  };

  render() {
    const page = this.state.page;
    return (
      <div>
        <div className="authHeader">
          <Button
            className={"authButton " + (page === "Login" ? "active" : "")}
            handleClick={() => this.handleClick("Login")}
          >
            Login
          </Button>

          <Button
            className={"authButton " + (page === "Signup" ? "active" : "")}
            handleClick={() => this.handleClick("Signup")}
          >
            Signup
          </Button>
        </div>
        {this.state.page === "Login" ? <Login /> : <Signup />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Auth));

// <div
//   className={"authButton " + (this.state.login ? "active" : "")}
//   onClick={this.handleLoginClick}
// >
//   Login
// </div>

// <div
//   className={"authButton " + (!this.state.login ? "active" : "")}
//   onClick={this.handleSignUpClick}
// >
//   Signup
// </div>

// single component that renders auth or login by setAuthToken
