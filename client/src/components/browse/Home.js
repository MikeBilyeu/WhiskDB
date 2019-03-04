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
        <h1 style={{ textAlign: "center", margin: "0" }}>Browse Recipes</h1>
        <Browse header="Select Diet" />
      </div>
    );
  }
}

export default Home;
