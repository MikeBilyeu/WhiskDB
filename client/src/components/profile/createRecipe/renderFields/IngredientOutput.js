import React from "react";
import { connect } from "react-redux";
import { formValueSelector, Field, getFormSyncErrors } from "redux-form";

import TextInput from "../inputs/TextInput";

//convert to class component
//track state for remove and edit toggle
//if remove state true render a button next to the ingredietns
// handleremoveIng will change form state at i to ''

const IngredientEditInput = ({
  input,
  label,
  meta: { touched, error, warning, active },
  placeholder,
  type = "text",
  pattern = null,
  addClass
}) => {
  const className = `field ${addClass} ${error && touched ? "error" : ""} ${
    active ? "input-active" : ""
  }`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      />
      {error ? <span className="error">*{error}</span> : null}
    </div>
  );
};

class IngredientOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggleEdit: false };
  }

  handleEditClick = () => {
    this.setState(prevState => {
      if (!this.props.ingredients.length) {
        return { toggleEdit: false };
      }
      if (this.props.syncErrors.ingredients) {
        return { toggleEdit: true };
      }
      return { toggleEdit: !prevState.toggleEdit };
    });
  };

  handleDeleteClick = i => {
    let modIngredients = [...this.props.ingredients];
    modIngredients.splice(i, 1);
    this.props.change(`ingredients`, modIngredients);
    if (!modIngredients.length) {
      this.setState({ toggleEdit: false });
    }
  };

  render() {
    return (
      <div style={{ display: "grid", alignItems: "center" }}>
        <div
          style={{
            justifySelf: "end",
            cursor: "pointer",
            padding: ".3rem .5rem",
            color: this.state.toggleEdit ? "#0172C4" : "inherit"
          }}
          onClick={this.handleEditClick}
        >
          Edit
        </div>
        <div
          style={{
            borderTop: "solid #E3E3E3 .01rem",
            marginBottom: "2rem",
            padding: "1rem 0",
            width: "100%",
            justifySelf: "center"
          }}
        >
          {this.props.ingredients.map((ingredient, i, arr) => {
            return (
              <div key={i}>
                {this.state.toggleEdit ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2.5rem 1fr",
                      placeItems: "center",
                      gridGap: ".1rem"
                    }}
                  >
                    <div
                      style={{
                        color: "red",
                        border: "solid #BFBFBF .08rem",
                        borderRadius: "100%",
                        width: "2.5rem",
                        height: "2.5rem",
                        lineHeight: "2.3rem",
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        this.handleDeleteClick(i);
                      }}
                    >
                      -
                    </div>
                    <Field
                      addClass={"full-input"}
                      name={`ingredients[${i}]`}
                      component={IngredientEditInput}
                      placeholder="e.g. 1 1/2 Cup Bread Crumbs (Dry)"
                    />
                  </div>
                ) : (
                  <div>
                    <div key={i}>{ingredient}</div>
                    {this.props.syncErrors.ingredients &&
                    this.props.syncErrors.ingredients[i] ? (
                      <span className="error">
                        *{this.props.syncErrors.ingredients[i]}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    ingredients: selector(state, "ingredients"),
    syncErrors: getFormSyncErrors("newRecipe")(state)
  };
};

export default connect(mapSateToProps)(IngredientOutput);
