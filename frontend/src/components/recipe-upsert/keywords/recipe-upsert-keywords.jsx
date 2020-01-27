import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../../form-inputs/input";

class Keywords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: ""
    };
  }

  handleChange = e => {
    this.setState({ keywords: e.target.value, error: null }, () => {
      let keywordsSplit = this.state.keywords
        .split(",")
        .map(item => item.trim());
      this.props.input.onChange(keywordsSplit);
    });
  };

  render() {
    return (
      <Input
        className={this.props.className}
        label="Tags"
        input={{
          ...this.props.input,
          value: this.state.keywords,
          onChange: this.handleChange
        }}
        placeholder="Tags (e.g., baked, crunchy, healthy)"
        meta={this.props.meta}
      />
    );
  }
}

Keywords.propTypes = {
  className: PropTypes.string.isRequired
};

export default Keywords;
