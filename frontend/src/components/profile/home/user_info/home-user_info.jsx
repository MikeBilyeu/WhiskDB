import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./home-user_info.scss";

class UserInfo extends React.PureComponent {
  render() {
    return (
      <div className="user-info">
        <Link className="user-info__edit" to="/profile/edit">
          <img src={this.props.image_url} alt="user profile" />
        </Link>
        <h2 className="user-info__full-name">
          {this.props.fullName || this.props.username}
        </h2>
        <h3 className="user-info__username">
          {this.props.fullName ? `@${this.props.username}` : null}
        </h3>
        <Link className="user-info__create-recipe" to="/profile/create-recipe">
          Create Recipe
        </Link>
        <Link className="user-info__edit-profile-btn" to="/profile/edit">
          Edit Profile
        </Link>
      </div>
    );
  }
}

UserInfo.propTypes = {
  fullName: PropTypes.string.isRequired,
  diet: PropTypes.string,
  image_url: PropTypes.string,
  numSaved: PropTypes.string.isRequired,
  numPosted: PropTypes.string.isRequired
};

export default UserInfo;
