import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class SearchBar extends Component {
  renderInput = ({ input }) => {
    return (
      <input
        className="prompt"
        {...input}
        autoComplete="off"
        placeholder={this.props.placeholder}
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
  form: "search"
})(SearchBar);
