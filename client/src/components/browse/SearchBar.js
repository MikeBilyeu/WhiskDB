import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class SearchBar extends Component {
  renderInput = ({ input }) => {
    return (
      <div className="ui fluid icon big input">
        <input
          className="prompt"
          {...input}
          autoComplete="off"
          placeholder={this.props.placeholder}
        />
        <i
          onClick={this.props.handleSubmit(this.onFormSubmit)}
          className="search link icon"
        />
      </div>
    );
  };

  onFormSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <div className="ui search">
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <Field name="search" component={this.renderInput} />
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.search) {
    errors.search = "Add a search term";
  }
  return errors;
};

export default reduxForm({
  form: "search",
  validate: validate
})(SearchBar);
