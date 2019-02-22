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
    console.log(user);
    return (
      <div>
        <h2>Username: {user.name}</h2>
        <h3>Edit Profile</h3>
        <button
          onClick={this.onLogoutClick}
          className="yellow ui button labeled icon "
        >
          <i className="user times icon" />
          Logout
        </button>
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
