import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as Arrow } from "../../assets/images/filterArrow.svg";
import { ReactComponent as DesktopArrow } from "../../assets/images/openArrow.svg";
import "./category_button.scss";

const CategoryButton = ({
  meal,
  className,
  activeFilterBtn,
  toggleFilterButton
}) => {
  const active = activeFilterBtn === "Meal";
  return (
    <button
      className={classNames(`${className}`, {
        [`${className}--active`]: active
      })}
      onClick={() => toggleFilterButton("Meal")}
    >
      {meal === "All Meals" ? "All categories" : meal}
      <Arrow
        className={classNames(`${className}__icon-m`, {
          [`${className}__icon-m--active`]: active
        })}
      />
      <DesktopArrow
        className={classNames(`${className}__icon-d`, {
          [`${className}__icon-d--active`]: active
        })}
      />
    </button>
  );
};

CategoryButton.propTypes = {
  className: PropTypes.string.isRequired,
  meal: PropTypes.string.isRequired,
  activeFilterBtn: PropTypes.string.isRequired,
  toggleFilterButton: PropTypes.func.isRequired
};

export default CategoryButton;
