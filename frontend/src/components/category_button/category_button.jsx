import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { toggleFilterButton } from "../../actions/browseActions";
import { ReactComponent as Arrow } from "../../assets/images/filterArrow.svg";
import { ReactComponent as DesktopArrow } from "../../assets/images/openArrow.svg";
import "./category_button.scss";

const CategoryButton = ({
  meal,
  className,
  buttonToggled,
  toggleFilterButton
}) => {
  const active = buttonToggled === "Meal";
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

const mapStatetoProps = state => ({
  buttonToggled: state.browseRecipes.toggleFilterButton,
  meal: state.browseRecipes.filterRecipes.meal
});

CategoryButton.propTypes = {
  className: PropTypes.string.isRequired
};

export default connect(
  mapStatetoProps,
  { toggleFilterButton }
)(CategoryButton);
