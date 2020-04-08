import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toggleFilterBtnBrowse,
  toggleFilterBtnProfile,
  updateFilterRecipe
} from "../../actions/browse";
import { ReactComponent as SearchIcon } from "../../assets/images/searchIcon.svg";
import "./search_bar.scss";

const SearchBar = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [focus, setFocus] = useState(false);
  const textInput = useRef(null);

  useEffect(() => setSearchTerm(props.searchTerm), [props.searchTerm]);

  const handleChange = e => setSearchTerm(e.target.value);

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.repeat) {
      handleBlur();
      props.history.push("/");
      /\S/.test(searchTerm)
        ? props.updateFilterRecipe("search", searchTerm)
        : props.updateFilterRecipe("category", "All Categories");
    }
  };

  const handleFocus = () => {
    setFocus(true);
    textInput.current.focus();
    props.toggleFilterBtnBrowse(null);
    props.toggleFilterBtnProfile(null);
  };

  const handleBlur = () => {
    setFocus(false);
    textInput.current.blur();
  };

  return (
    <div
      className={classNames("search-bar", {
        "search-bar--active": focus
      })}
      onClick={handleFocus}
      onBlur={handleBlur}
    >
      <SearchIcon
        className={classNames("search-bar__icon", {
          "search-bar__icon--active": focus
        })}
      />
      <input
        ref={textInput}
        className="search-bar__input"
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder="Search thousands of delicious recipes…"
        value={searchTerm}
        type="search"
        aria-label="Search"
      />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    searchTerm: state.browseRecipes.filterRecipes.search
  };
};

export default withRouter(
  connect(
    mapSateToProps,
    { toggleFilterBtnBrowse, toggleFilterBtnProfile, updateFilterRecipe }
  )(SearchBar)
);
