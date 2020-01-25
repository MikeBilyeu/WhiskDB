import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../../../assets/images/add.svg";
import "./home-header.scss";

class Header extends React.PureComponent {
  render() {
    return (
      <div className="profile-header">
        <div className="user-info">
          <Link className="edit-link" to="/profile/edit">
            <img src={this.props.image_url} alt="user profile" />
          </Link>
          <h2>{this.props.fullName || null}</h2>
          <h3>{this.props.diet || null}</h3>
          <Link className="create-recipe-link" to="/profile/create-recipe">
            <div className="create-recipe-btn">Create Recipe</div>
            <AddIcon style={{ width: "1.3rem" }} />
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  fullName: PropTypes.string.isRequired,
  diet: PropTypes.string.isRequired,
  image_url: PropTypes.string,
  numSaved: PropTypes.string.isRequired,
  numPosted: PropTypes.string.isRequired
};

export default Header;
