import React from "react";
import { Field } from "redux-form";

// Components
import { Input } from "../../form-inputs/Input";
import { Button } from "../../Button";

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
      if (!this.validIngredientRegEx.test(this.state.ingredient)) {
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

  validIngredientRegEx = /^(\d{0,3}(\.(?=\d)\d{1,2})|^[1-9]\d?\/(?=[1-9]\d?)[1-9]\d?|^\d{1,3} [1-9]\d?\/[1-9]\d?|^[1-9]\d{0,2}) ([a-z\d-,/+.%&*!] *){3,40}( \( *([a-z\d-,/+.%&*!] *){1,40}\) *)?$/i;

  render() {
    return (
      <div>
        <h2>Ingredients</h2>
        <Field
          name="servings"
          component={Input}
          label="Yield"
          placeholder="2"
          type="number"
          pattern="[0-9]*"
        />
        <ul>
          {this.props.fields.map((ingredient, index, arr) => (
            <li key={index}>
              <Button onClick={() => this.props.fields.remove(index)}>
                Remove
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
