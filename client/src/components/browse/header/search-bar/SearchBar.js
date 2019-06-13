import React, { Component } from "react";
import { connect } from "react-redux";

//action creator
import { getBrowseRecipes } from "../../../../actions/browseActions";
import { getSearchRecipes } from "../../../../actions/browseActions";
import { toggleFilterButton } from "../../../../actions/browseActions";

//styles
import "./search-bar-styles.css";

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
    return (
      <div
        className="searchBar"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <input
          className="input"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          autoComplete="off"
          placeholder="Search"
          value={this.props.searchTerm}
        />
        <SearchIcon onClick={this.handleClick} className="searchIcon" />
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
