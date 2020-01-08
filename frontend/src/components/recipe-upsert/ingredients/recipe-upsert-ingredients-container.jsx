import React from "react";
import { Field } from "redux-form";
import Input from "../../form-inputs/input";
import TextArea from "../../form-inputs/textarea";
import { numberParse, validIngredientRegEx } from "../utils/input-parse";
import styles from "../recipe-upsert.module.scss";

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
  }

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
    const placeholder = {
      ingredients: "1-1/2 cup milk\n1 tablespoon olive oil"
    };
    return (
      <div className={styles.ingredientsContainer}>
        <Field
          name="servings"
          component={Input}
          label="Yield"
          placeholder="2"
          type="number"
          pattern="[0-9]*"
          normalize={numberParse}
          className={styles.yield}
        />
        <Field
          name="ingredients"
          className={styles.ingredients}
          type="text"
          component={TextArea}
          label="Ingredients"
          placeholder={placeholder.ingredients}
        />
      </div>
    );
  }
}

export default Ingredients;
