import React from "react";

import SearchBar from "./SearchBar";
import Browse from "./Browse";

class Home extends React.Component {
  renderOptions = () => {};
  render() {
    return (
      <div>
        <SearchBar placeholder="Search Recipes..." />
        <div className="ui horizontal divider">Or</div>
        <Browse header="Browse Recipes" />
      </div>
    );
  }
}

export default Home;
