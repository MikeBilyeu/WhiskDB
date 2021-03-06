import React, { useEffect } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router-dom";
import {
  updateSavedFilterRecipe,
  incrementSavedOffset
} from "../../../actions/recipe";
import HeaderDesktop from "../../header_desktop";
import FilterResults from "../../filter_results";
import UserInfo from "./user_info";
import PageToggle from "./page_toggle";
import userLogo from "../../../assets/images/profileLogo.png";
import Results from "../../results";

import "./profile-home.scss";

const Home = props => {
  const { username, diet, image_url } = props.auth.user;

  useEffect(() => {
    document.title = `ZipiWhisk | ${username || "Profile"}`;
  }, [username]);

  const handleFilterClick = option => {
    props.updateSavedFilterRecipe(option);
  };

  return (
    <div className="profile-home">
      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop isAuth={true} user_img={image_url} />
      </MediaQuery>
      <UserInfo
        username={username}
        diet={diet === "none" ? null : diet}
        image_url={image_url || userLogo}
      />
      <PageToggle
        numSaved={props.savedRecipes.length}
        savedRecipes={props.savedRecipes}
        isFetching={props.isFetching}
      />
      {props.activeFilterBtn ? (
        <FilterResults
          filterRecipes={props.filterRecipes}
          buttonToggled={props.activeFilterBtn}
          handleClick={handleFilterClick}
        />
      ) : null}

      <Results
        filterOptionsOpened={props.activeFilterBtn}
        recipes={props.savedRecipes}
        isFetching={props.isFetching}
        handleClick={props.incrementSavedOffset}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  filterRecipes: state.auth.filterRecipes,
  activeFilterBtn: state.auth.activeFilterBtn,
  auth: state.auth,
  savedRecipes: state.savedRecipes.recipes,
  isFetching: state.savedRecipes.isFetching
});

export default withRouter(
  connect(
    mapStateToProps,
    { updateSavedFilterRecipe, incrementSavedOffset }
  )(Home)
);
