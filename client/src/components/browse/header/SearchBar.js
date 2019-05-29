import React, { Component } from "react";
import { connect } from "react-redux";

//action creator
import { getBrowseRecipes } from "../../../actions/browseActions";

import { ReactComponent as SearchIcon } from "./searchIcon.svg";

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
  handleClick = () => {
    this.props.getBrowseRecipes({
      ...this.props.browseData,
      search: this.state.search.trim()
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.getBrowseRecipes({
        ...this.props.browseData,
        search: this.state.search.trim()
      });
    }
  };

  render() {
    let style = {
      width: "90%",
      height: "3rem",
      fontSize: "1.3rem",
      // border: ".1rem solid #BFBFBF",,
      backgroundColor: "#EAEAEA",
      borderRadius: ".5rem",
      padding: "0 0 0 1.5rem",
      transition: "all .1s ease-out",
      display: "grid",
      gridTemplateColumns: "15fr 1fr",
      placeItems: "center"
    };

    // if (this.state.focus) {
    //   style.border = "solid #0172C4 .1rem";
    // }
    return (
      <div style={style} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <input
          style={{ all: "unset", width: "100%", height: "2.5rem" }}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          autoComplete="off"
          placeholder="Search..."
        />
        <SearchIcon
          onClick={this.handleClick}
          style={{ width: "4rem", cursor: "pointer", padding: "0.5rem 1rem" }}
        />
      </div>
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
