import React from "react";
import { connect } from "react-redux";
import {
  getBrowseRecipes,
  getSearchRecipes,
  toggleFilterButton
} from "../../actions/browseActions";
import { ReactComponent as SearchIcon } from "../../assets/images/searchIcon.svg";
import "./search_bar.scss";

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
        className={`searchBar ${this.state.focus && "search-active"} ${
          this.props.className
        }`}
        onBlur={this.handleBlur}
      >
        <SearchIcon
          style={{ fill: this.state.focus ? "#313131" : "#707070" }}
          onClick={this.handleFocus}
          className="searchIcon"
        />
        <input
          ref={this.textInput}
          style={{ width: "100%" }}
          className="input"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyPress={this.handleKeyPress}
          autoComplete="off"
          placeholder="Search thousands of delicious recipes…"
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
    browseData: state.browseRecipes.filterRecipes,
    searchTerm: state.browseRecipes.filterRecipes.search
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes, getSearchRecipes, toggleFilterButton }
)(SearchBar);
