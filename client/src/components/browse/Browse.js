import React, { Component } from "react";

import BrowseOption from "./BrowseOption";

class Browse extends Component {
  render() {
    return (
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          gridGap: "3rem"
        }}
      >
        <h1 className="ui header center aligned ">{this.props.header}</h1>
        <div style={{ display: "grid", gridAutoFlow: "column" }}>
          <BrowseOption text="Non-Vegetarian" />
          <BrowseOption text="Vegetarian" />
        </div>
        <button className="ui button">Continue</button>
      </div>
    );
  }
}

export default Browse;
