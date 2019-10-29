import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import { Button } from "../Button";
import { ReactComponent as WhiskIcon } from "../../images/WhiskIcon.svg";
import { ReactComponent as UserIcon } from "../../images/userProfile.svg";
import { ReactComponent as SavedIcon } from "../../images/savedRecipes.svg";
import { ReactComponent as MyRecipesIcon } from "../../images/myRecipes.svg";

const Header = ({ page, username, onClick, ...props }) => {
  const savedActive = page === "saved" ? "active" : "";
  const myRecipesActive = page === "myRecipes" ? "active" : "";
  return (
    <div>
      <div className="profile-whisk-icon">
        <WhiskIcon
          style={{
            width: "5rem",
            margin: ".2rem auto"
          }}
        />
      </div>
      <div className="profile-header">
        <Link className="edit-link" to="/profile/edit">
          <UserIcon style={{ width: "3.5rem" }} />
          <div className="edit">Edit</div>
        </Link>
        <h2>{username}</h2>
      </div>
      <div className="s-mr-toggle">
        <Button
          className={`authButton ${savedActive}`}
          onClick={() => onClick("saved")}
        >
          <SavedIcon style={{ width: "1.5rem" }} />
        </Button>

        <Button
          className={`authButton ${myRecipesActive}`}
          onClick={() => onClick("myRecipes")}
        >
          <MyRecipesIcon style={{ width: "1.5rem" }} />
        </Button>
      </div>
    </div>
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default Header;
