import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import RecipeUpsert from "../../recipe-upsert";
import { createRecipe } from "../../../actions/recipe";

class CreateRecipe extends React.Component {
  componentDidMount() {
    document.title = "WhiskDB | Create Recipe";
  }

  handleSubmit = values => {
    this.props.createRecipe(values, this.props.history);
  };

  handleBackClick = () => {
    this.props.history.goBack();
  };

  render() {
    const initialValues = {
      categories: [],
      keywords: [],
      imageFile: null
    };
    return (
      <div>
        <Header onClick={this.handleBackClick} />
        <RecipeUpsert
          initialValues={initialValues}
          destroyOnUnmount={false}
          submitText="Save Recipe"
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { createRecipe }
  )(CreateRecipe)
);
