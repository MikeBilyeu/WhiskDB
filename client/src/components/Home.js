import React from "react";

import SearchBar from "./SearchBar";
import BrowseOption from "./BrowseOption";
import Button from "./Button";

const Home = props => {
  return (
    <div>
      <SearchBar onSubmit={props.onSubmit} placeholder="Search Recipes..." />
      <div className="ui horizontal divider">Or</div>
      <h1 className="ui header center aligned ">Browse Recipes</h1>
      <BrowseOption text="Non-Vegitarian" />
      <BrowseOption text="Vegitarian" />
      <Button text="Continue" />
    </div>
  );
};

export default Home;
