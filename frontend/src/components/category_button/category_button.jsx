import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as Arrow } from "../../assets/images/filterArrow.svg";
import { ReactComponent as DesktopArrow } from "../../assets/images/openArrow.svg";
import "./category_button.scss";

const CategoryButton = props => {
  return (
    <button
      className={classNames(`${props.className}`, {
        [`${props.className}--active`]: props.active
      })}
      onClick={() => props.toggleFilterButton("Category")}
    >
      {props.category}
      <Arrow
        className={classNames(`${props.className}__icon-m`, {
          [`${props.className}__icon-m--active`]: props.active
        })}
      />
      <DesktopArrow
        className={classNames(`${props.className}__icon-d`, {
          [`${props.className}__icon-d--active`]: props.active
        })}
      />
    </button>
  );
};

CategoryButton.propTypes = {
  className: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  toggleFilterButton: PropTypes.func.isRequired
};

export default CategoryButton;
