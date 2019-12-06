import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Filter from "./filter";
import Results from "../results";
import {
  getBrowseRecipes,
  getSearchRecipes
} from "../../actions/browseActions";

import { filterOptions } from "./utils";

class Home extends React.Component {
  componentDidMount() {
    document.title = "WhiskDB | A Recipe Database";
    if (this.props.browseData.search === "") {
      this.props.getBrowseRecipes(this.props.browseData);
    } else {
      this.props.getSearchRecipes(this.props.browseData);
    }
  }

  render() {
    const { options, type } = filterOptions(this.props.buttonToggled);
    return (
      <div className="home">
        <Header />
        {this.props.buttonToggled ? (
          <Filter filterOptions={options} filterType={type} />
        ) : null}

        <Results
          recipes={this.props.recipes.recipes}
          isFetching={this.props.recipes.isFetching}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  buttonToggled: state.browseRecipes.toggleFilterButton,
  recipes: state.browseRecipes,
  browseData: state.browseRecipes.browseData,
  user_id: state.auth.user.user_id
});

export default connect(
  mapStateToProps,
  { getBrowseRecipes, getSearchRecipes }
)(Home);
