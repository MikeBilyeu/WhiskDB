import React, { useEffect } from "react";
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

const Home = props => {
  // Check if user changed the filterRecipes
  const isDirtyFilter =
    props.filterRecipes.search !== "" ||
    props.filterRecipes.category !== "All Categories";

  useEffect(() => {
    document.title = "ZipiWhisk | The internet’s source of free recipes.";
  }, []);

  const handleFilterClick = (option, type) => {
    // set the filterRecipes to the option selected
    props.updateFilterRecipe(type, option);
    window.scrollTo(0, 0);
  };

  const handleLoadMoreClick = () => {
    props.incrementOffset();
  };

  return (
    <div className="home">
      <MediaQuery maxDeviceWidth={649}>
        <Header
          filterRecipes={props.filterRecipes}
          handleClick={handleFilterClick}
          isAuth={props.isAuth}
        />
      </MediaQuery>

      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop isAuth={props.isAuth} user_img={props.user_img}>
          <FilterButtons
            filterRecipes={props.filterRecipes}
            handleClick={handleFilterClick}
          />
        </HeaderDesktop>
      </MediaQuery>
      {!isDirtyFilter && <Hero />}
      {props.activeFilterBtn && (
        <FilterResults
          className={`mobile ${props.activeFilterBtn}`}
          filterRecipes={props.filterRecipes}
          handleClick={handleFilterClick}
          buttonToggled={props.activeFilterBtn}
        />
      )}

      <Results
        filterOptionsOpened={props.activeFilterBtn}
        recipes={props.recipes.recipes}
        isFetching={props.recipes.isFetching}
        handleClick={handleLoadMoreClick}
      />
    </div>
  );
};

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
