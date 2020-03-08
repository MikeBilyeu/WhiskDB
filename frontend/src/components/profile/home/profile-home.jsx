import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router-dom";
import {
  getPostedRecipes,
  getSavedRecipes,
  updateFilterRecipe
} from "../../../actions/recipeActions";
import HeaderDesktop from "../../header_desktop";
import FilterResults from "../../filter_results";
import UserInfo from "./user_info";
import PageToggle from "./page_toggle";
import userLogo from "../../../assets/images/profileLogo.png";
import Results from "../../results";

import "./profile-home.scss";

const Home = props => {
  const [page, setPage] = useState("saved");

  useEffect(() => {
    if (!props.postedRecipes.length && !props.savedRecipes.length) {
      props.getPostedRecipes();
      props.getSavedRecipes();
    }
  }, []);
  const { full_name, username, diet, image_url } = props.auth.user;

  useEffect(() => {
    // Auto switch page state if results are empty
    document.title = `Zipiwisk | ${username || "Profile"}`;

    if (!props.isFetching && !props.savedRecipes.length) {
      !props.postedRecipes.length ? setPage("saved") : setPage("posted");
    }
  }, [props.savedRecipes, username]);

  const handlePageClick = page => {
    setPage(page);
  };

  const handleFilterClick = option => {
    props.updateFilterRecipe(option);
  };

  return (
    <div className="profile-home">
      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop isAuth={true} user_img={image_url} />
      </MediaQuery>
      <UserInfo
        fullName={full_name}
        username={username}
        diet={diet === "none" ? null : diet}
        image_url={image_url || userLogo}
      />
      <PageToggle
        page={page}
        onClick={handlePageClick}
        numSaved={props.savedRecipes.length}
        savedRecipes={props.savedRecipes}
        numPosted={props.postedRecipes.length}
        isFetching={props.isFetching}
      />
      {props.activeFilterBtn ? (
        <FilterResults
          filterRecipes={props.filterRecipes}
          buttonToggled={props.activeFilterBtn}
          handleClick={handleFilterClick}
        />
      ) : null}
      {page === "saved" ? (
        <Results
          filterOptionsOpened={props.activeFilterBtn}
          recipes={props.savedRecipes}
          isFetching={props.isFetching}
        />
      ) : (
        <Results
          filterOptionsOpened={props.activeFilterBtn}
          recipes={props.postedRecipes}
          isFetching={props.isFetching}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  filterRecipes: state.auth.filterRecipes,
  activeFilterBtn: state.auth.activeFilterBtn,
  auth: state.auth,
  savedRecipes: state.savedRecipes.recipes,
  postedRecipes: state.postedRecipes.recipes,
  isFetching: state.savedRecipes.isFetching || state.postedRecipes.isFetching
});

export default withRouter(
  connect(
    mapStateToProps,
    { getPostedRecipes, getSavedRecipes, updateFilterRecipe }
  )(Home)
);
