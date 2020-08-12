import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginUser, registerUser, googleLogin } from "../../actions/auth";
import MediaQuery from "react-responsive";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Header from "./header";
import HeaderDesktop from "../header_desktop";
import Login from "./login";
import Signup from "./signup";
import googleIcon from "../../assets/images/google-icon.png";
import "./auth.scss";

const Auth = props => {
  const [goBackPath] = useState(props.location.state);

  useEffect(() => {
    document.title = "ZipiWhisk | The internet’s source of free recipes.";
  }, []);

  useEffect(() => {
    if (props.location.search) {
      let token = props.location.search.replace("?token=Bearer%20", "Bearer ");
      props.googleLogin(token);
    }
  }, [props.location.search]);

  useEffect(() => {
    if (props.isAuthenticated) {
      goBackPath
        ? props.history.push({
            pathname: goBackPath.from,
            state: { from: "/auth" }
          })
        : props.history.push("/profile");
    }
  }, [props.isAuthenticated]);

  const { registerUser, loginUser } = props;

  return (
    <div className="auth-page">
      <MediaQuery maxDeviceWidth={649}>
        <Header path={props.history.location.pathname} />
      </MediaQuery>
      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop isAuth={props.isAuthenticated} />
      </MediaQuery>

      <Switch>
        <Route
          path="/auth/signup"
          render={props => <Signup {...props} registerUser={registerUser} />}
        />
        <Route
          path="/auth"
          render={props => <Login {...props} loginUser={loginUser} />}
        />
      </Switch>
      <div
        className="auth-page__google-btn"
        onClick={() => {
          //  window.open("http://localhost:3001/api/users/google", "_self");
          //this doesn't work
          window.open("http://zipiwhisk.com:80/api/users/google", "_self");
        }}
      >
        <img className="auth-page__google-img" alt="" src={googleIcon} />
        <span>Login with Google</span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser, googleLogin }
)(withRouter(Auth));
