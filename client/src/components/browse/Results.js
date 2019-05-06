import React from "react";
import { connect } from "react-redux";

import { Loading } from "../loading/Loading";

import HomeHeader from "./header/HomeHeader";
class Results extends React.Component {
  render() {
    const { recipes, isFetching } = this.props.recipes;

    if (isFetching) {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => ({
  recipes: state.browseRecipes
});

export default connect(mapStateToProps)(Results);
