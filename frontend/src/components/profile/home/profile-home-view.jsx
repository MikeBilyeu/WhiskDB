import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getMyRecipes,
  getSavedRecipes,
  toggleSortButton,
  updateFilterRecipe
} from "../../../actions/recipeActions";
import FilterResults from "../../filter-results";
import Header from "./header";
import PageToggle from "./page-toggle";
import Results from "../../results";

import "./profile-home.scss";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: "saved"
    };
  }

  componentDidMount() {
    document.title = "WhiskDB | Profile";
    if (!this.props.myRecipes.length && !this.props.savedRecipes.length) {
      this.props.getMyRecipes();
      this.props.getSavedRecipes();
    }
  }

  handlePageClick = page => {
    this.setState(prevState => {
      if (prevState.page !== page) {
        return { page };
      }
    });
  };

  handleFilterClick = option => {
    this.props.updateFilterRecipe(option);
  };

  render() {
    const { page } = this.state;
    const { full_name, username, diet } = this.props.auth.user;
    document.title = `WhiskDB | ${username}`;
    const { savedRecipes, myRecipes } = this.props;

    return (
      <div className="profile">
        <Header fullName={full_name} diet={diet === "none" ? null : diet} />
        <PageToggle
          page={this.state.page}
          onClick={this.handlePageClick}
          numSaved={savedRecipes.length}
          savedRecipes={savedRecipes}
          numPosted={myRecipes.length}
          isFetching={this.props.isFetching}
        />
        {this.props.buttonToggled ? (
          <FilterResults
            filterRecipes={this.props.filterRecipes}
            buttonToggled={this.props.buttonToggled}
            handleClick={this.handleFilterClick}
          />
        ) : null}
        {page === "saved" ? (
          <Results
            filterOptionsOpened={this.props.buttonToggled}
            recipes={savedRecipes}
            isFetching={this.props.isFetching}
          />
        ) : (
          <Results
            filterOptionsOpened={this.props.buttonToggled}
            recipes={myRecipes}
            isFetching={this.props.isFetching}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterRecipes: state.auth.filterRecipes,
  buttonToggled: state.auth.toggleFilterButton,
  auth: state.auth,
  savedRecipes: state.savedRecipes.recipes,
  myRecipes: state.myRecipes.recipes,
  isFetching: state.savedRecipes.isFetching || state.myRecipes.isFetching
});

export default withRouter(
  connect(
    mapStateToProps,
    { getMyRecipes, getSavedRecipes, toggleSortButton, updateFilterRecipe }
  )(Home)
);
