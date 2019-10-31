import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Action Creator
import { createRecipe } from "../../../actions/recipeActions";

// Components
import Header from "./Header";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import Input from "../../form-inputs/Input";

import "./create-recipe-styles.css";

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return <div>{error}</div>;
    }
  }

  handleSubmit = values => {
    const newRecipe = {
      ...values,
      created_by: this.props.auth.user.user_id
    };
    this.props.createRecipe(newRecipe, this.props.history);
  };

  handleClick = click => {
    this.setState(prevState => {
      return { page: prevState.page + click };
    });
  };

  // onImageChange(event) {
  //   console.log(event.target.files[0]);
  // }
  // handleSubmit = e => {
  //   // maybe get the created_by user id from the backend after it ahs been
  //   e.preventDefault();
  // };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  render() {
    return (
      <div>
        <Header onClick={this.props.history.goBack} />
        <form
          className="recipe-form"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
          onKeyDown={this.handleKeyDown}
        >
          <Field
            name="title"
            component={Input}
            label="Title"
            placeholder="Juicy Roasted Chicken"
          />
          <Field
            name="image"
            component={Input}
            type="file"
            accept="image/.jpg, image/.png, image/.jpeg"
          />
          <FieldArray name="ingredients" component={Ingredients} />
          <Directions />
        </form>
      </div>
    );
  }
}

const mapSateToProps = state => {
  return {
    auth: state.auth
  };
};

CreateRecipe = connect(
  mapSateToProps,
  { createRecipe }
)(CreateRecipe);

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  initialValues: {
    ingredients: [],
    directions: [],
    privateRecipe: false,
    categories: { diet: {}, meal: {} },
    keywords: []
  }
})(withRouter(CreateRecipe));
