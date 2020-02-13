import React from "react";
import { Field } from "redux-form";
import Input from "../../form_inputs/input";
import TextArea from "../../form_inputs/textarea";
import { numberParse, validIngredientRegEx } from "../utils/input-parse";
import "../recipe_upsert.scss";

class Ingredients extends React.Component {
  handleChange = e => {
    this.setState({ ingredient: e.target.value, error: null });
  };

  // handleKeyDown = e => {
  //   if (e.key === "Enter") {
  //     if (!validIngredientRegEx.test(this.state.ingredient)) {
  //       this.setState({
  //         error: "Ingredient is not in a valid format: Amount, Unit, Ingredient"
  //       });
  //     } else {
  //       this.props.fields.push(this.state.ingredient);
  //       this.setState({ ingredient: "" });
  //     }
  //   }
  // };

  render() {
    return (
      <div className="ru-ingredients">
        <Field
          name="ingredients"
          className="ru-ingredients__input"
          type="text"
          component={TextArea}
          label="Ingredients"
          placeholder="One ingredient per line"
        />
      </div>
    );
  }
}

export default Ingredients;
