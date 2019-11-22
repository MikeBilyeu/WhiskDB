import React from "react";
import { connect } from "react-redux";
import UnitsAndServings from "../units-servings";
import convertIngredients from "../../../selectors/ingredient-selector";

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStrikeThrough: false
    };
  }

  handleClick = () => {
    this.setState(({ isStrikeThrough }) => {
      return { isStrikeThrough: !isStrikeThrough };
    });
  };

  render() {
    const { amount, unit, ingredient, prep } = this.props;
    // map over amounts if multiple amounts e.g. 1 cup + 1/2 cup
    if (typeof amount === "object") {
      let amounts = amount.map(amount => {
        return `${amount.amount} ${amount.unit}`;
      });
      return (
        <li
          onClick={this.handleClick}
          style={{
            textDecoration: this.state.isStrikeThrough
              ? "line-through"
              : "none",
            opacity: this.state.isStrikeThrough ? ".2" : "1"
          }}
        >{`${amounts.join(" + ")} ${ingredient} ${prep}`}</li>
      );
    }

    return (
      <li
        onClick={this.handleClick}
        style={{
          textDecoration: this.state.isStrikeThrough ? "line-through" : "none",
          opacity: this.state.isStrikeThrough ? ".2" : "1"
        }}
      >
        {`${amount} ${unit} ${ingredient} ${prep}`}
      </li>
    );
  }
}

const Ingredients = props => {
  return (
    <div className="ingredients">
      <h2>Ingredients</h2>
      <UnitsAndServings />
      <ul className="ingredient-list">
        {props.ingredients.map(({ amount, unit = "", ingredient, prep }, i) => {
          prep = prep ? `(${prep})` : "";
          return (
            <Ingredient
              key={`ingredient${i}`}
              amount={amount}
              unit={unit}
              ingredient={ingredient}
              prep={prep}
              i={i}
            />
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  // redux memoized selector
  ingredients: convertIngredients(state)
});

export default connect(mapStateToProps)(Ingredients);
