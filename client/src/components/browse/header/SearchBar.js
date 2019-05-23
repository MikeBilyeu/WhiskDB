import React, { Component } from "react";
import { connect } from "react-redux";

//action creator
import { getBrowseRecipes } from "../../../actions/browseActions";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      search: ""
    };
  }

  handleFocus = () => {
    this.setState({ focus: true });
  };
  handleBlur = () => {
    this.setState({ focus: false });
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      let browse = { ...this.props.browseData, search: e.target.value.trim() };
      this.props.getBrowseRecipes(browse);
    }
  };

  render() {
    let style = {
      width: "90%",
      height: "2.9rem",
      fontSize: "1.3rem",
      border: ".1rem solid #BFBFBF",
      borderRadius: "50rem",
      padding: "1rem",
      outline: "none",
      transition: "all .1s ease-out"
    };

    if (this.state.focus) {
      style.border = "solid #0172C4 .1rem";
    }
    return (
      <input
        style={style}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        autoComplete="off"
        placeholder="Search..."
      />
    );
  }
}

const mapSateToProps = state => {
  return {
    browseData: state.browseRecipes.browseData
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes }
)(SearchBar);
