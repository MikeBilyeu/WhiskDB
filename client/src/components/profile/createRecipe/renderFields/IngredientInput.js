import React from "react";
import { Field } from "redux-form";
import { getFormSyncErrors } from "redux-form";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";

import UnitDropDown from "../inputs/UnitDropDown";
import TextInput from "../inputs/TextInput";

/*
// How to make Field input not update state until an onlick is called?
 So I need to have and input that does everything The field input does e.g. validation,
 parse, normalize, but non store the value until the add button is clicked

//Problem with the last element in the array it has 3 possible states "non-exsiting, valid, not valid"
ingredients: ["1/2 cup butter (melted)"] // non-exsiting - user didn't enter a value
ingredients: ["1/2 cup butter (melted)", "1/2 cup milk"] // valid -  the value is valid
ingredients: ["1/2 cup butter (melted)", "sdfjkds"] // not valid - the value is not valid

 newRecipe: {
 ingredients: ["1/2 cup butter (melted)"],
 directions: [{}],
 ...
}


pass a stateless component to Field
That stateless compoent will setState on the local state on IngredientInput
when a user clickes the 'add' button it will push that local state into the
Field compnent and update ++ the ingredient number




 */

const ingredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) ([a-z\d-,\/+] *){3,40}( \( *([a-z0-9-,\/+] *){1,40}\) *)?$/i;
// Renders all of the ingredient fields i.e. ingredient, unit, amount
class IngredientInput extends React.Component {
  constructor(props) {
    super(props);
    //keep track of the ingredientValue in local state
    //when user clickes the add button run validation on that value
    //if it is valid change form state
    this.state = {
      ingredientValue: "",
      error: null
    };
  }

  // capitalize = value => {
  //   return value && value.charAt(0).toUpperCase() + value.substring(1);
  // };
  // textParse = value => {
  //   let strArr = value.match(/.{0,55}/) || [""];
  //   return value && strArr[0];
  // };

  handleChange = e => {
    if (ingredientRegEx.test(this.state.ingredientValue)) {
      this.setState({ error: null });
    }
    this.setState({ ingredientValue: e.target.value });
  };

  handleAddClick = () => {
    if (!ingredientRegEx.test(this.state.ingredientValue)) {
      this.setState({
        error:
          "Ingredient is not in a valid format: Amount, Unit, Ingredient, (prep)"
      });
    } else {
      // run validion
      //if valid
      this.props.change(
        `ingredients[${this.props.ingredients.length}]`,
        this.state.ingredientValue
      );

      this.setState((state, props) => {
        return { ingredientValue: "" };
      });
      //else display warning
    }
  };

  handleKeyDown = e => {
    if (e.key == "Enter") {
      if (!ingredientRegEx.test(this.state.ingredientValue)) {
        this.setState({
          error:
            "Ingredient is not in a valid format: Amount, Unit, Ingredient, (prep)"
        });
      } else {
        this.props.change(
          `ingredients[${this.props.ingredients.length}]`,
          this.state.ingredientValue
        );
        this.setState((state, props) => {
          return { ingredientValue: "" };
        });
      }
    }
  };

  render() {
    return (
      <div>
        <label for="ingredientInput">Ingredient</label>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 2.5rem",
            placeItems: "center",
            gridGap: ".2rem"
          }}
        >
          <input
            id="ingredientInput"
            style={{
              width: "100%",
              borderRadius: "5rem",
              fontSize: "1rem",
              border: "solid #BFBFBF .08rem",
              padding: ".5rem .8rem"
            }}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.ingredientValue}
            placeholder="e.g. 1 1/2 tsp Sea salt (to taste)"
          />
          <div
            style={{
              color: "#0172C4",
              border: "solid #BFBFBF .08rem",
              borderRadius: "100%",
              width: "2.5rem",
              height: "2.5rem",
              lineHeight: "2.5rem",
              textAlign: "center",
              cursor: "pointer"
            }}
            type="button"
            onClick={this.handleAddClick}
          >
            +
          </div>
        </div>

        <div style={{ marginLeft: ".8rem", fontSize: ".8rem" }}>
          Format: Amount, Unit, Ingredient, (prep)
        </div>

        {this.state.error ? (
          <span className="error">{this.state.error}</span>
        ) : null}
      </div>
    );
  }
}

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    syncErrors: getFormSyncErrors("newRecipe")(state),
    ingredients: selector(state, "ingredients")
  };
};

export default connect(mapSateToProps)(IngredientInput);
