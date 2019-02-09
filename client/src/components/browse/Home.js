import React from "react";

import SearchBar from "./SearchBar";
import BrowseOption from "./BrowseOption";
import Button from "../Button";

const Home = props => {
  return (
    <div>
      <SearchBar onSubmit={props.onSubmit} placeholder="Search Recipes..." />
      <div className="ui horizontal divider">Or</div>
      <h1 className="ui header center aligned ">Browse Recipes</h1>
      <BrowseOption text="Non-Vegetarian" />
      <BrowseOption text="Vegetarian" />
      <Button text="Continue" linkTo="/" />
    </div>
  );
};

export default Home;