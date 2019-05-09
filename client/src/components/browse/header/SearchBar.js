import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class SearchBar extends Component {
  renderInput = ({ input }) => {
    return (
      <input
        style={{
          width: "14rem",
          height: "2.9rem",
          fontSize: "1.3rem",
          border: ".1rem solid #BFBFBF",
          borderRadius: "50rem",
          padding: "1rem"
        }}
        className="prompt"
        {...input}
        autoComplete="off"
        placeholder="Search..."
      />
    );
  };

  onFormSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
        <Field name="search" component={this.renderInput} />
      </form>
    );
  }
}

export default reduxForm({
  form: "browse",
  initialValues: {
    search: "",
    mealType: "Breakfast"
  }
})(SearchBar);
