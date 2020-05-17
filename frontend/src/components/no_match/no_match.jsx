import React from "react";
import SearchBar from "../search_bar";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/ZipiWhisk-Logo.png";
import "./no-match.scss";

const NoMatch = () => {
  document.title = "404 Not Found";
  return (
    <div className="not-found">
      <Link to="/" className="not-found__home-link">
        <img
          className="not-found__home-link-img"
          src={Logo}
          alt="zipiWhisk logo"
        />
      </Link>
      <h1 className="not-found__title">404 Not Found</h1>
      <h2 className="not-found__msg">
        Sorry, page not found. <br /> Try searching for something else.
      </h2>
      <SearchBar />
    </div>
  );
};

export default NoMatch;
