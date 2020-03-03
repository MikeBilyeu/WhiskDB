import React from "react";
import { connect } from "react-redux";
import IngredientAdjust from "../ingredient_adjust";
import convertIngredients from "../../../selectors/ingredient-selector";

class Ingredient extends React.Component {
  render() {
    const { amount, unit, ingredient } = this.props;

    // map over amounts if multiple amounts e.g. 1 cup + 1/2 cup
    if (typeof amount === "object") {
      let amounts = amount.map(amount => {
        return `${amount.amount} ${amount.unit}`;
      });
      return (
        <li className="r-ingredients__item">
          <span className="r-ingredients__item-amount">{`${amounts.join(
            " & "
          )} `}</span>
          <span className="r-ingredients__item-ingredient">{ingredient}</span>
        </li>
      );
    }

    return (
      <li className="r-ingredients__item">
        <span className="r-ingredients__item-amount">{`${amount} ${unit} `}</span>
        <span className="r-ingredients__item-ingredient">{ingredient}</span>
      </li>
    );
  }
}

const Ingredients = props => {
  return (
    <div className="r-ingredients">
      <IngredientAdjust />
      <ul className="r-ingredients__list">
        {props.ingredients.map(({ amount, unit = "", ingredient }, i) => {
          return (
            <Ingredient
              key={`ingredient${i}`}
              amount={amount}
              unit={unit}
              ingredient={ingredient}
              i={i}
            />
          );
        })}
      </ul>
      <span className="r-ingredients__fade"></span>
    </div>
  );
};

const mapStateToProps = state => ({
  // redux memoized selector
  ingredients: convertIngredients(state)
});

export default connect(mapStateToProps)(Ingredients);
