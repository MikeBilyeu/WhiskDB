import React from "react";
import PropTypes from "prop-types";
import Button from "../../button";
import styles from "../recipe_upsert.module.scss";

const recipeCategories = [
  "vegetarian",
  "vegan",
  "breakfast",
  "lunch",
  "dinner",
  "appetizer",
  "side",
  "dessert",
  "beverage"
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
    <div className={styles.categoriesContainer}>
      <h2>Categories</h2>
      <ul className={styles.list}>
        {recipeCategories.map((category, index, arr) => {
          const className =
            props.categories && props.categories.includes(category)
              ? styles.active
              : styles.btn;

          return (
            <li key={"categories " + index}>
              <Button
                className={className}
                onClick={e => handleClick(e, category)}
              >
                {category}
              </Button>
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
