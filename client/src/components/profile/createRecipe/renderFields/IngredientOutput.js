import React from "react";
import { connect } from "react-redux";
import { formValueSelector, Field } from "redux-form";

import TextInput from "../inputs/TextInput";
const selector = formValueSelector("newRecipe");

//convert to class component
//track state for remove and edit toggle
//if remove state true render a button next to the ingredietns
// handleremoveIng will change form state at i to ''

class IngredientOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggleEdit: false };
  }

  handleEditClick = () => {
    this.setState(prevState => {
      return { toggleEdit: !prevState.toggleEdit };
    });
  };

  handleDeleteClick = i => {
    let modIngredients = [...this.props.ingredients];
    modIngredients.splice(i, 1);
    this.props.change(`ingredients`, modIngredients);
  };

  render() {
    return (
      <div>
        <div onClick={this.handleEditClick}>Edit</div>
        <div>
          {this.props.ingredients.map((ingredient, i, arr) => {
            return (
              <div key={i} draggable>
                {this.state.toggleEdit ? (
                  <div>
                    <div
                      style={{ color: "red" }}
                      onClick={() => {
                        this.handleDeleteClick(i);
                      }}
                    >
                      -
                    </div>
                    <Field
                      addClass={"full-input"}
                      name={`ingredients[${i}]`}
                      component={TextInput}
                      placeholder="e.g. 1 1/2 Cup Bread Crumbs (Dry)"
                    />
                  </div>
                ) : (
                  <div key={i}>{ingredient}</div>
                )}
                <div>drag icon</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => {
  return { ingredients: selector(state, "ingredients") };
};

export default connect(mapSateToProps)(IngredientOutput);
