import React from "react";
import { connect } from "react-redux";
import { reduxForm, isDirty } from "redux-form";
import { Redirect } from "react-router-dom";
import Header from "./header";
import { getRecipe, submitEditRecipe } from "../../../actions/recipeActions";
import Loading from "../../loading";

class Edit extends React.Component {
  handleSubmit = values => {
    this.props.submitEditRecipe(values);
  };
  render() {
    const { isFetching } = this.props.recipeData;
    if (isFetching) {
      return <Loading />;
    } else if (
      this.props.auth.user.user_id !== this.props.recipeData.recipe.created_by
    ) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <Header />
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    ...state.recipe.recipe,
    title: state.recipe.recipe.title
  },
  dirty: isDirty("edit-profile"),
  recipeData: state.recipe,
  auth: state.auth
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
