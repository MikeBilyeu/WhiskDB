import React from "react";
import { connect } from "react-redux";
import {
  getBrowseRecipes,
  getSearchRecipes,
  toggleFilterButton
} from "../../../actions/browseActions";
import { ReactComponent as SearchIcon } from "../../../assets/images/searchIcon.svg";
import "./home-search-bar.scss";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
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
    this.props.toggleFilterButton(null);
    this.textInput.current.focus();
  };

  handleBlur = () => {
    this.setState({ focus: false });
  };

  render() {
    return (
      <div
        className={"searchBar " + (this.state.focus ? "search-active" : "")}
        onBlur={this.handleBlur}
      >
        <SearchIcon
          style={{ fill: this.state.focus ? "#0172C4" : "#676767" }}
          onClick={this.handleFocus}
          className="searchIcon"
        />
        <input
          ref={this.textInput}
          style={{ width: this.state.focus ? "calc(100% - 1rem)" : "0" }}
          className="input"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyPress={this.handleKeyPress}
          autoComplete="off"
          placeholder="Search"
          value={this.props.searchTerm}
          type="search"
          aria-label="Search"
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
