import React from "react";
import { Field } from "redux-form";

// Components
import { Input } from "../../form-inputs/Input";
import { Button } from "../../Button";

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ingredient: "" };
  }

  handleChange = e => {
    this.setState({ ingredient: e.target.value });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.fields.push(this.state.ingredient);
      this.setState({ ingredient: "" });
    }
  };

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
                onChange={this.handleChange}
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
          meta
        />
      </div>
    );
  }
}

export default Ingredients;
