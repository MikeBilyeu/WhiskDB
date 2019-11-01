import React, { Component } from "react";

// Categories
import { Button } from "../../Button";
import { ReactComponent as Remove } from "../../../images/removeDark.svg";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "vegetarian",
        "vegan",
        "breakfast",
        "lunch",
        "dinner",
        "appetizer",
        "dessert",
        "beverage"
      ]
    };
  }

  handleAddClick = category => {
    // Add to redux state
    this.props.change("categories", [...this.props.categories, category]);

    this.setState(({ categories }) => {
      // Remove from local state
      return { categories: categories.filter(el => el !== category) };
    });
  };

  handleRemoveClick = category => {
    // Remove from redux state
    this.props.change(
      "categories",
      this.props.categories.filter(el => el !== category)
    );

    // Add to local state
    this.setState(({ categories }) => {
      return { categories: [...categories, category] };
    });
  };

  render() {
    return (
      <div>
        <h2>Categories</h2>
        <label>Categories</label>
        <ul>
          {this.state.categories.map((category, index, arr) => {
            return (
              <li key={"add " + index}>
                <Button onClick={() => this.handleAddClick(category)}>
                  {category}
                </Button>
              </li>
            );
          })}
        </ul>

        <label>Remove Categories</label>
        <ul>
          {this.props.categories &&
            this.props.categories.map((category, index, arr) => {
              return (
                <li key={"remove " + index}>
                  <Button onClick={() => this.handleRemoveClick(category)}>
                    {category}
                    <Remove style={{ width: ".8rem" }} />
                  </Button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Categories;
