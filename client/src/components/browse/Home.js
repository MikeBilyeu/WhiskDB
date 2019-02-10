import React from "react";

import SearchBar from "./SearchBar";
import BrowseOption from "./BrowseOption";
import Button from "../Button";

class Home extends React.Component {
  renderOptions = () => {};
  render() {
    return (
      <div>
        <SearchBar placeholder="Search Recipes..." />
        <div className="ui horizontal divider">Or</div>
        <div>
          <h1 className="ui header center aligned ">Browse Recipes</h1>
          <BrowseOption text="Non-Vegetarian" />
          <BrowseOption text="Vegetarian" />
          <Button text="Continue" linkTo="/" />
        </div>
      </div>
    );
  }
}

export default Home;
