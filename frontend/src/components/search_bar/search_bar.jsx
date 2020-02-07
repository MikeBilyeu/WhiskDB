import React from "react";
import classNames from "classnames";
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
        className={classNames("search-bar", {
          "search-bar--active": this.state.focus
        })}
        onClick={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <SearchIcon
          className={classNames("search-bar__icon", {
            "search-bar__icon--active": this.state.focus
          })}
        />
        <input
          ref={this.textInput}
          className="search-bar__input"
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
