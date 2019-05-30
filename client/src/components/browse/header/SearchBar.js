import React, { Component } from "react";
import { connect } from "react-redux";

//action creator
import { getBrowseRecipes } from "../../../actions/browseActions";
import { getSearchRecipes } from "../../../actions/browseActions";
import { setSearchTerm } from "../../../actions/browseActions";

import { ReactComponent as SearchIcon } from "./searchIcon.svg";

const SearchBar = props => {
  const handleChange = e => {
    // change search input
    props.setSearchTerm({ ...props.browseData, search: e.target.value });
    if (!/\S/.test(e.target.value)) {
      props.getBrowseRecipes({ ...props.browseData, search: e.target.value });
    } else {
      props.getSearchRecipes({ ...props.browseData, search: e.target.value });
    }
  };

  const handleClick = () => {
    if (/\S/.test(props.searchTerm)) {
      props.getSearchRecipes({
        ...props.browseData,
        search: props.searchTerm
      });
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      if (/\S/.test(props.searchTerm)) {
        props.getSearchRecipes({
          ...props.browseData,
          search: props.searchTerm
        });
      }
    }
  };

  let style = {
    width: "90%",
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
    <div style={style}>
      <input
        style={{
          all: "unset",
          width: "100%",
          height: "2.5rem",
          color: "#484848"
        }}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoComplete="off"
        placeholder="Search..."
        value={props.searchTerm}
      />
      <SearchIcon
        onClick={handleClick}
        style={{ width: "3.4rem", cursor: "pointer", padding: "0.5rem 1rem" }}
      />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    browseData: state.browseRecipes.browseData,
    searchTerm: state.browseRecipes.browseData.search
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes, getSearchRecipes, setSearchTerm }
)(SearchBar);
