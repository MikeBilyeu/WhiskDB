import React, { Component } from "react";
import { connect } from "react-redux";

//action creator
import { getBrowseRecipes } from "../../../actions/browseActions";
import { getSearchRecipes } from "../../../actions/browseActions";
import { toggleFilterButton } from "../../../actions/browseActions";

import { ReactComponent as SearchIcon } from "./searchIcon.svg";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: false };
  }
  handleChange = e => {
    //if search is whitespace
    if (!/\S/.test(e.target.value)) {
      this.props.getBrowseRecipes({
        ...this.props.browseData,
        search: e.target.value
      });
    } else {
      this.props.getSearchRecipes({
        ...this.props.browseData,
        search: e.target.value
      });
    }
  };

  handleClick = () => {
    if (/\S/.test(this.props.searchTerm)) {
      this.props.getSearchRecipes({
        ...this.props.browseData,
        search: this.props.searchTerm
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (/\S/.test(this.props.searchTerm)) {
        this.props.getSearchRecipes({
          ...this.props.browseData,
          search: this.props.searchTerm
        });
      }
    }
  };
  handleFocus = () => {
    this.setState({ focus: true });
    this.props.toggleFilterButton("Meal");
  };

  handleBlur = () => {
    this.setState({ focus: false });
  };

  render() {
    let style = {
      width: "85%",
      height: "3rem",
      fontSize: "1.3rem",
      backgroundColor: "#EAEAEA",
      borderRadius: ".5rem",
      padding: "0 0 0 1.5rem",
      transition: "all .1s ease-out",
      display: "grid",
      gridTemplateColumns: "15fr 1fr",
      placeItems: "center"
    };

    return (
      <div style={style} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <input
          style={{
            all: "unset",
            width: "100%",
            height: "2.5rem",
            color: "#484848"
          }}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          autoComplete="off"
          placeholder="Search..."
          value={this.props.searchTerm}
        />
        <SearchIcon
          onClick={this.handleClick}
          style={{ width: "3.4rem", cursor: "pointer", padding: "0.5rem 1rem" }}
        />
      </div>
    );
  }
}

const mapSateToProps = state => {
  return {
    browseData: state.browseRecipes.browseData,
    searchTerm: state.browseRecipes.browseData.search
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes, getSearchRecipes, toggleFilterButton }
)(SearchBar);
