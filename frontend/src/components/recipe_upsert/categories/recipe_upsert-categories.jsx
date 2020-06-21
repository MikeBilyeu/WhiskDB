import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "../recipe_upsert.scss";

const recipeCategories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appetizer",
  "Side",
  "Dessert",
  "Beverage"
];

const Categories = props => {
  const handleClick = (e, category) => {
    e.preventDefault();

    if (props.categories.includes(category)) {
      // Remove from redux state
      props.change(
        "categories",
        props.categories.filter(el => el !== category)
      );
    } else {
      // Add to redux state
      props.change("categories", [...props.categories, category]);
    }
  };

  return (
    <div className="ru-categories">
      <h2 className="ru-categories__title">Categories</h2>
      {props.meta.error && props.meta.submitFailed && (
        <div className="validation-error">{props.meta.error}</div>
      )}
      <ul className="ru-categories__list">
        {recipeCategories.map((category, index, arr) => {
          return (
            <li
              key={"categories " + index}
              className={classNames("ru-categories__item", {
                "ru-categories__item--active":
                  props.categories && props.categories.includes(category)
              })}
              onClick={e => handleClick(e, category)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  change: PropTypes.func.isRequired
};

export default Categories;
