import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as WhiskIcon } from "../../../assets/images/WhiskIcon.svg";
import userPhoto from "../../../assets/images/user-photo.jpg";
import "./profile-header.scss";

const Header = ({ username, fullName, ...props }) => {
  return (
    <div className="profile-header">
      <h2 className="username">{username}</h2>
      <div className="user-info">
        <Link className="edit-link" to="/profile/edit">
          <img src={userPhoto} />
          <div className="edit">Edit Profile</div>
        </Link>
        <h2>{fullName || null}</h2>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired
};

export default Header;
