import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Filter from "./filter";
import Results from "./results";

import { filterOptions } from "./utils";

const Home = props => {
  const { options, type } = filterOptions(props.buttonToggled);

  return (
    <div className="home">
      <Header />
      {props.buttonToggled ? (
        <Filter filterOptions={options} filterType={type} />
      ) : null}
      <Results />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    buttonToggled: state.browseRecipes.toggleFilterButton
  };
};
export default connect(mapSateToProps)(Home);
