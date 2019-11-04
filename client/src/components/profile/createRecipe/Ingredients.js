import React from "react";
import { Field } from "redux-form";

// Components
import Input from "../../form-inputs/Input";
import { Button } from "../../Button";
import { ReactComponent as Remove } from "../../../images/removeDark.svg";

// Parse Functions
import { numberParse, validIngredientRegEx } from "./input-parse";

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      error: null,
      touched: false
    };
  }

  handleChange = e => {
    this.setState({ ingredient: e.target.value, error: null });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      if (!validIngredientRegEx.test(this.state.ingredient)) {
        this.setState({
          error:
            "Ingredient is not in a valid format: Amount, Unit, Ingredient, (prep)"
        });
      } else {
        this.props.fields.push(this.state.ingredient);
        this.setState({ ingredient: "" });
      }
    }
  };

  render() {
    return (
      <div className="cr-section">
        <h2>Ingredients</h2>
        <Field
          name="servings"
          component={Input}
          label="Yield"
          placeholder="2"
          type="number"
          pattern="[0-9]*"
          normalize={numberParse}
        />
        <ul>
          {this.props.fields.map((ingredient, index, arr) => (
            <li key={index}>
              <Button onClick={() => this.props.fields.remove(index)}>
                <Remove style={{ width: ".8rem" }} />
              </Button>
              <Field
                name={`ingredients[${index}]`}
                type="text"
                component={Input}
                label=""
              />
            </li>
          ))}
        </ul>
        <Input
          label="Ingredient"
          input={{
            value: this.state.ingredient,
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown
          }}
          placeholder="1 1/2 Tablespoon Onion (Chopped)"
          meta={{ error: this.state.error, touched: true }}
        />
      </div>
    );
  }
}

export default Ingredients;
