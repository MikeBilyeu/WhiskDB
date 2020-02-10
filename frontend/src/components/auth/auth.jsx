import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Header from "./header";
import HeaderDesktop from "../header_desktop";
import Login from "./login";
import Signup from "./signup";
import "./auth.scss";

class Auth extends React.Component {
  componentDidMount() {
    document.title = "Zipiwhisk | The internet’s source of free recipes.";
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

  render() {
    //const page = this.state.page;
    return (
      <div className="auth-page">
        <MediaQuery maxDeviceWidth={649}>
          <Header />
        </MediaQuery>
        <MediaQuery minDeviceWidth={650}>
          <HeaderDesktop />
        </MediaQuery>
        <Switch>
          <Route path="/auth/signup" component={Signup} />
          <Route path="/auth" component={Login} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Auth));
