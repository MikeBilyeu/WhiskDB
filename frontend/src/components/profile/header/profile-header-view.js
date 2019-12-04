import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as WhiskIcon } from "../../../assets/images/WhiskIcon.svg";
import SortButton from "../../sort-button";
import PageToggle from "./page-toggle";
import userPhoto from "../../../assets/images/user-photo.jpg";
import "./profile-header.scss";

const Header = ({ username, fullName, ...props }) => {
  return (
    <div className="profile-header">
      <div className="user-info">
        <h2>{fullName || null}</h2>

        <Link className="edit-link" to="/profile/edit">
          <img src={userPhoto} alt="user profile" />
          <div className="edit">Edit Profile</div>
        </Link>

        <Link to="/profile/create-recipe">
          <div className="create-recipe-btn">Create Recipe</div>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired
};

export default Header;
