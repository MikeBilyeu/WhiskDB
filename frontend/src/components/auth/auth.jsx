import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import Login from "./login";
import Signup from "./signup";
import "./auth.scss";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Login"
    };
  }

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

  handleClick = page => {
    this.setState({ page });
  };

  render() {
    const page = this.state.page;
    return (
      <div>
        <Header page={page} onClick={this.handleClick} />
        {page === "Login" ? <Login /> : <Signup />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Auth));
