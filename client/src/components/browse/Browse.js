import React, { Component } from "react";

import BrowseOption from "./BrowseOption";

class Browse extends Component {
  state = { x: 50 };
  render() {
    return (
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          gridGap: "1rem"
        }}
      >
        <h2 style={{ textAlign: "center", margin: "0" }}>
          {this.props.header}
        </h2>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "row"
            // overflowX: "hidden",
          }}
          onTouchStart={event => {
            console.log(event);
          }}
        >
          <BrowseOption text="Vegan" />
        </div>
        <button className="fluid ui blue big button">Continue</button>
      </div>
    );
  }
}

export default Browse;
