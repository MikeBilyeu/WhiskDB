import React, { Component } from "react";
import { connect } from "react-redux";

const SearchBar = () => {
  return (
    <input
      style={{
        width: "14rem",
        height: "2.9rem",
        fontSize: "1.3rem",
        border: ".1rem solid #BFBFBF",
        borderRadius: "50rem",
        padding: "1rem"
      }}
      autoComplete="off"
      placeholder="Search..."
    />
  );
};

export default connect()(SearchBar);
