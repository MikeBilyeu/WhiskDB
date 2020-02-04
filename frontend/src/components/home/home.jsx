import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Hero from "./hero";
import FilterResults from "../filter_results";
import Results from "../results";
import {
  getBrowseRecipes,
  getSearchRecipes,
  incrementOffset,
  updateFilterRecipe
} from "../../actions/browseActions";
import "./home.scss";

class Home extends React.Component {
  componentDidMount() {
    document.title = "WhiskDB | A Recipe Database";
    if (!this.props.recipes.recipes.length) {
      this.props.getBrowseRecipes();
    }
  }

  handleClick = (option, type) => {
    // set the filterRecipes to the option selected
    this.props.updateFilterRecipe(type, option);
    window.scrollTo(0, 0);
  };

  handleLoadMoreClick = () => {
    this.props.incrementOffset();
  };

  render() {
    return (
      <div className="home">
        <Header
          filterRecipes={this.props.filterRecipes}
          handleClick={this.handleClick}
        />
        {this.props.buttonToggled ? (
          <FilterResults
            className="mobile"
            filterRecipes={this.props.filterRecipes}
            handleClick={this.handleClick}
            buttonToggled={this.props.buttonToggled}
          />
        ) : null}
        <Hero />

        <Results
          filterOptionsOpened={this.props.buttonToggled}
          recipes={this.props.recipes.recipes}
          isFetching={this.props.recipes.isFetching}
          handleClick={this.handleLoadMoreClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  buttonToggled: state.browseRecipes.toggleFilterButton,
  recipes: state.browseRecipes,
  filterRecipes: state.browseRecipes.filterRecipes,
  user_id: state.auth.user.user_id
});

export default connect(
  mapStateToProps,
  { getBrowseRecipes, getSearchRecipes, incrementOffset, updateFilterRecipe }
)(Home);
