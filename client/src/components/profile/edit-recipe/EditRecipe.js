import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";

import EditHeader from "./EditHeader";
import TextInput from "../createRecipe/inputs/TextInput";

// Action Creator
import { getRecipe } from "../../../actions/recipeActions";

import { Loading } from "../../loading/Loading";

class EditRecipe extends React.Component {
  componentDidMount() {
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getRecipe(recipe_id, user_id);
  }
  capitalize = value => {
    return (
      value &&
      value
        .charAt(0)
        .toUpperCase()
        .trim() + value.substring(1)
    );
  };
  titleParse = value => {
    let strArr = value.match(/.{0,55}/) || [""];
    return value && strArr[0];
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
        <EditHeader />
        <form>
          <Field
            addClass={"full-input"}
            name="title"
            component={TextInput}
            label="Title"
            placeholder="The Best Homemade Pizza"
            normalize={this.capitalize}
            parse={this.titleParse}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeData: state.recipe,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRecipe }
)(
  reduxForm({
    form: "edit-recipe" // a unique identifier for this form
  })(EditRecipe)
);
