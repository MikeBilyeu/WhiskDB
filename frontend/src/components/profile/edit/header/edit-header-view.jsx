import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../../../actions/auth";
import { ReactComponent as Arrow } from "../../../../assets/images/arrowLeft.svg";
import "./edit-header.scss";

class Header extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { history } = this.props;
    return (
      <div className="header">
        <Arrow className="back-btn" onClick={() => history.goBack()} />
        <h2>Edit Profile</h2>
        <div
          style={{ cursor: "pointer", color: "#0172C4" }}
          onClick={this.onLogoutClick}
        >
          Logout
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { logoutUser }
  )(Header)
);
