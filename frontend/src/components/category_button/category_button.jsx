import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as Arrow } from "../../assets/images/filterArrow.svg";
import "./category_button.scss";

const CategoryButton = ({ name, selected, active, handleClick }) => {
  return (
    <button
      className={classNames("category-btn", {
        "category-btn--active": active,
        "category-btn--selected": selected
      })}
      onClick={handleClick}
    >
      {name}

      <Arrow
        className={classNames("category-btn__icon", {
          "category-btn__icon--active": active
        })}
      />
    </button>
  );
};

CategoryButton.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default CategoryButton;
