import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../../actions/auth";
import MediaQuery from "react-responsive";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Header from "./header";
import HeaderDesktop from "../header_desktop";
import Login from "./login";
import Signup from "./signup";
import "./auth.scss";

const Auth = props => {
  useEffect(() => {
    document.title = "Zipiwisk | The internet’s source of free recipes.";
    // If logged in and user auth redirect to profile
    if (props.isAuthenticated) {
      props.history.push("/profile");
    }
  }, []);

  useEffect(() => {
    // If logged in and user auth redirect to profile
    if (props.isAuthenticated) {
      props.history.push("/profile");
    }
  }, [props.isAuthenticated]);

  const { registerUser, loginUser } = props;

  return (
    <div className="auth-page">
      <MediaQuery maxDeviceWidth={649}>
        <Header />
      </MediaQuery>
      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop />
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
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser }
)(withRouter(Auth));
