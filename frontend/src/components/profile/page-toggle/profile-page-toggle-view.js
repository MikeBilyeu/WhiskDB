import React from "react";
import PropTypes from "prop-types";
import Button from "../../button";
import "./profile-page-toggle.scss";

const PageToggle = ({ page, onClick, numRecipesSaved, numRecipesPosted }) => {
  const savedActive = page === "saved" ? "active" : "";
  const myRecipesActive = page === "myRecipes" ? "active" : "";
  return (
    <div className="page-toggle">
      <Button className={`btn ${savedActive}`} onClick={() => onClick("saved")}>
        <div className="btn-num">{numRecipesSaved}</div>
        <div>Saved</div>
      </Button>

      <Button
        className={`btn ${myRecipesActive}`}
        onClick={() => onClick("myRecipes")}
      >
        <div className="btn-num">{numRecipesPosted}</div>
        <div>Posted</div>
      </Button>
    </div>
  );
};

PageToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  numRecipesSaved: PropTypes.number.isRequired,
  numRecipesPosted: PropTypes.number.isRequired
};

export default PageToggle;
