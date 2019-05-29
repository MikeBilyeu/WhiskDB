import React from "react";

import HomeHeader from "./header/HomeHeader";
import Results from "./results/Results";

class Home extends React.Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <Results />
      </div>
    );
  }
}

export default Home;
