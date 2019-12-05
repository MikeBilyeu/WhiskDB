import React from "react";
import PropTypes from "prop-types";
import Button from "../../../../button";
import "./header-page-toggle.scss";

const PageToggle = ({ page, onClick }) => {
  const savedActive = page === "saved" ? "active" : "";
  const myRecipesActive = page === "myRecipes" ? "active" : "";
  return (
    <div className="page-toggle">
      <Button
        className={`btn saved ${savedActive}`}
        onClick={() => onClick("saved")}
      >
        <div>Saved</div>
      </Button>

      <Button
        className={`btn posted ${myRecipesActive}`}
        onClick={() => onClick("myRecipes")}
      >
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
