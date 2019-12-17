import React from "react";
import { connect } from "react-redux";
import { reduxForm, isDirty } from "redux-form";
import { getRecipe, submitEditRecipe } from "../../../actions/recipeActions";
import convertTime from "../../../selectors/time-selector";
import Header from "./header";
import RecipeUpsert from "../../recipe-upsert";
import Loading from "../../loading";

class Edit extends React.Component {
  handleSubmit = values => {
    this.props.submitEditRecipe(values);
  };

  render() {
    let { isFetching, recipe } = this.props.recipeData;
    const ingredientsStr = recipe.ingredients.join("\n");

    recipe = {
      ...recipe,
      time: this.props.recipeTime,
      ingredients: ingredientsStr
    };

    if (isFetching) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <RecipeUpsert
          initialValues={recipe}
          submitText="Save Changes"
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dirty: isDirty("edit-profile"),
  recipeData: state.recipe,
  // redux memoized selector
  recipeTime: convertTime(state)
});

// submit function used for remote submit
function submit(values, dispatch, props) {
  return props.submitEditRecipe(values);
}

export default connect(
  mapStateToProps,
  { getRecipe, submitEditRecipe }
)(
  reduxForm({
    form: "edit-recipe",
    enableReinitialize: true,
    onSubmit: submit
  })(Edit)
);
