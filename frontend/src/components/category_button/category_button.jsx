import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as Arrow } from "../../assets/images/filterArrow.svg";
import { ReactComponent as DesktopArrow } from "../../assets/images/openArrow.svg";
import "./category_button.scss";

const CategoryButton = props => {
  const active = props.activeFilterBtn === "Meal";
  return (
    <button
      className={classNames(`${props.className}`, {
        [`${props.className}--active`]: active
      })}
      onClick={() => props.toggleFilterButton("Meal")}
    >
      {props.meal === "All Meals" ? "All categories" : props.meal}
      <Arrow
        className={classNames(`${props.className}__icon-m`, {
          [`${props.className}__icon-m--active`]: active
        })}
      />
      <DesktopArrow
        className={classNames(`${props.className}__icon-d`, {
          [`${props.className}__icon-d--active`]: active
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
