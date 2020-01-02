import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../../../assets/images/add.svg";
import userPhoto from "../../../../assets/images/user-photo.jpg";
import "./home-header.scss";

class Header extends React.PureComponent {
  render() {
    console.log(this.props.diet);
    return (
      <div className="profile-header">
        <div className="user-info">
          <Link className="edit-link" to="/profile/edit">
            <img src={userPhoto} alt="user profile" />
          </Link>
          <h2>{this.props.fullName || null}</h2>
          <h3>{this.props.diet || null}</h3>
          <Link className="create-recipe-link" to="/profile/create-recipe">
            <div className="create-recipe-btn">Create Recipe</div>
            <AddIcon style={{ width: "1.5rem" }} />
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  fullName: PropTypes.string.isRequired,
  diet: PropTypes.string.isRequired,
  numSaved: PropTypes.string.isRequired,
  numPosted: PropTypes.string.isRequired
};

export default Header;
