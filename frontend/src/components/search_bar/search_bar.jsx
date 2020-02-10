import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toggleFilterButton,
  updateFilterRecipe
} from "../../actions/browseActions";
import { ReactComponent as SearchIcon } from "../../assets/images/searchIcon.svg";
import "./search_bar.scss";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = { focus: false, searchTerm: "" };
  }
  componentDidMount() {
    this.setState({ searchTerm: this.props.searchTerm });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ ...this.state, searchTerm: this.props.searchTerm });
    }
  }

  handleChange = e => {
    this.setState({ ...this.state, searchTerm: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      if (/\S/.test(this.state.searchTerm)) {
        this.props.history.push("/");
        this.props.updateFilterRecipe("search", this.state.searchTerm);
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
    // if redux searchTerm store it in local searchTerm
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
          value={this.state.searchTerm}
          type="search"
          aria-label="Search"
        />
      </div>
    );
  }
}

const mapSateToProps = state => {
  return {
    searchTerm: state.browseRecipes.filterRecipes.search
  };
};

export default withRouter(
  connect(
    mapSateToProps,
    { toggleFilterButton, updateFilterRecipe }
  )(SearchBar)
);
