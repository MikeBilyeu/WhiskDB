import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import FilterResults from "../filter-results";
import Results from "../results";
import {
  getBrowseRecipes,
  getSearchRecipes,
  loadMoreResults
} from "../../actions/browseActions";
import "./home.scss";

class Home extends React.Component {
  componentDidMount() {
    document.title = "WhiskDB | A Recipe Database";
    if (this.props.filterRecipes.search === "") {
      this.props.getBrowseRecipes(this.props.filterRecipes);
    } else {
      this.props.getSearchRecipes(this.props.filterRecipes);
    }
  }

  handleClick = (option, type) => {
    // set the filterRecipes to the option selected
    this.props.getBrowseRecipes({
      ...this.props.filterRecipes,
      [type]: option,
      search: ""
    });
  };

  handleLoadMoreClick = () => {
    this.props.loadMoreResults();
  };

  render() {
    return (
      <div className="home">
        <Header
          filterRecipes={this.props.filterRecipes}
          buttonToggled={this.props.buttonToggled}
        />
        {this.props.buttonToggled ? (
          <FilterResults
            filterRecipes={this.props.filterRecipes}
            handleClick={this.handleClick}
            buttonToggled={this.props.buttonToggled}
          />
        ) : null}

        <Results
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
  { getBrowseRecipes, getSearchRecipes, loadMoreResults }
)(Home);
