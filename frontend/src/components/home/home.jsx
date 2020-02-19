import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import Header from "./header";
import HeaderDesktop from "../header_desktop";
import FilterButtons from "../header_desktop/filter_buttons";
import Hero from "./hero";
import FilterResults from "../filter_results";
import Results from "../results";

import {
  getBrowseRecipes,
  getSearchRecipes,
  incrementOffset,
  updateFilterRecipe
} from "../../actions/browse";
import "./home.scss";

class Home extends React.Component {
  componentDidMount() {
    document.title = "Zipiwisk | The internet’s source of free recipes.";
    if (!this.props.recipes.recipes.length && !this.props.recipes.isFetching) {
      this.props.updateFilterRecipe("meal", "All Meals");
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

  dirtyFilterRecipes = () => {
    // Check if user changed the filterRecipes
    const { search, meal } = this.props.filterRecipes;
    return search !== "" || meal !== "All Meals";
  };

  render() {
    return (
      <div className="home">
        <MediaQuery maxDeviceWidth={649}>
          <Header
            filterRecipes={this.props.filterRecipes}
            handleClick={this.handleClick}
            isAuth={this.props.isAuth}
          />
        </MediaQuery>

        <MediaQuery minDeviceWidth={650}>
          <HeaderDesktop
            isAuth={this.props.isAuth}
            user_img={this.props.user_img}
          >
            <FilterButtons
              filterRecipes={this.props.filterRecipes}
              handleClick={this.handleClick}
            />
          </HeaderDesktop>

          {this.dirtyFilterRecipes() ? null : <Hero />}
        </MediaQuery>

        {this.props.activeFilterBtn ? (
          <FilterResults
            className={`mobile ${this.props.activeFilterBtn}`}
            filterRecipes={this.props.filterRecipes}
            handleClick={this.handleClick}
            buttonToggled={this.props.activeFilterBtn}
          />
        ) : null}

        <Results
          filterOptionsOpened={this.props.activeFilterBtn}
          recipes={this.props.recipes.recipes}
          isFetching={this.props.recipes.isFetching}
          handleClick={this.handleLoadMoreClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeFilterBtn: state.browseRecipes.activeFilterBtn,
  recipes: state.browseRecipes,
  filterRecipes: state.browseRecipes.filterRecipes,
  user_id: state.auth.user.user_id,
  user_img: state.auth.user.image_url,
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getBrowseRecipes, getSearchRecipes, incrementOffset, updateFilterRecipe }
)(Home);
