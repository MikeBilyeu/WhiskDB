import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class EditProfile extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <h2>{user.username}</h2>
        <div onClick={this.onLogoutClick}>Logout</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(EditProfile);
