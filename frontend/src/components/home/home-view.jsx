import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Filter from "../filter";
import Results from "../results";
import {
  getBrowseRecipes,
  getSearchRecipes
} from "../../actions/browseActions";

class Home extends React.Component {
  componentDidMount() {
    document.title = "WhiskDB | A Recipe Database";
    if (this.props.browseData.search === "") {
      this.props.getBrowseRecipes(this.props.browseData);
    } else {
      this.props.getSearchRecipes(this.props.browseData);
    }
  }

  handleClick = (option, type) => {
    // set the browseData to the option selected
    // getSavedRecipes / postedRecipes
    this.props.getBrowseRecipes({
      ...this.props.browseData,
      [type]: option,
      search: ""
    });
  };

  render() {
    return (
      <div className="home">
        <Header />
        {this.props.buttonToggled ? (
          <Filter
            filterRecipes={this.props.browseData}
            handleClick={this.handleClick}
            buttonToggled={this.props.buttonToggled}
          />
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
