import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { ReactComponent as Arrow } from "../../assets/images/filterArrow.svg";
import "./category-button.scss";

const CategoryButton = ({ name, selected, active, handleClick }) => {
  const btnStyle = `filter-btn ${active && "filter-active"} ${selected &&
    "filter-select"}`;
  const arrowStyle = `filter-arrow ${active && "filter-active"}`;

  return (
    <Button className={btnStyle} onClick={handleClick}>
      {name}
      <span>
        <Arrow className={arrowStyle} />
      </span>
    </Button>
  );
};

CategoryButton.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default CategoryButton;
