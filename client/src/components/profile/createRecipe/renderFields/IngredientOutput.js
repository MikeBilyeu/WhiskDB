import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
const selector = formValueSelector("newRecipe");

//convert to class component
//track state for remove and edit toggle
//if remove state true render a button next to the ingredietns
// handleremoveIng will change form state at i to ''

class IngredientOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleRemove: false,
      toggleEdit: false
    };
  }

  handleRemoveClick = () => {
    this.setState(prevState => {
      return { toggleRemove: !prevState.toggleRemove };
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
        <div onClick={this.handleRemoveClick}>Remove</div>
        <div>
          {this.props.ingredients.map((ingredient, i, arr) => {
            return (
              <div key={ingredient + i}>
                {this.state.toggleRemove ? (
                  <div
                    style={{ color: "red" }}
                    onClick={() => {
                      this.handleDeleteClick(i);
                    }}
                  >
                    -
                  </div>
                ) : null}
                <div key={"ingredient " + i}>{ingredient}</div>
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
