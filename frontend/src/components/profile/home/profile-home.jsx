import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router-dom";
import {
  getMyRecipes,
  getSavedRecipes,
  updateFilterRecipe
} from "../../../actions/recipeActions";
import HeaderDesktop from "../../header_desktop";
import FilterResults from "../../filter_results";
import UserInfo from "./user_info";
import PageToggle from "./page_toggle";
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
    document.title = "Zipiwhisk | Profile";
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
    const { full_name, username, diet, image_url } = this.props.auth.user;
    document.title = `Zipiwhisk | ${username}`;
    const { savedRecipes, myRecipes } = this.props;

    return (
      <div className="profile-home">
        <MediaQuery minDeviceWidth={650}>
          <HeaderDesktop isAuth={true} user_img={image_url} />
        </MediaQuery>
        <UserInfo
          fullName={full_name}
          diet={diet === "none" ? null : diet}
          image_url={image_url}
        />
        <PageToggle
          page={this.state.page}
          onClick={this.handlePageClick}
          numSaved={savedRecipes.length}
          savedRecipes={savedRecipes}
          numPosted={myRecipes.length}
          isFetching={this.props.isFetching}
        />
        {this.props.activeFilterBtn ? (
          <FilterResults
            filterRecipes={this.props.filterRecipes}
            buttonToggled={this.props.activeFilterBtn}
            handleClick={this.handleFilterClick}
          />
        ) : null}
        {page === "saved" ? (
          <Results
            filterOptionsOpened={this.props.activeFilterBtn}
            recipes={savedRecipes}
            isFetching={this.props.isFetching}
          />
        ) : (
          <Results
            filterOptionsOpened={this.props.activeFilterBtn}
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
  activeFilterBtn: state.auth.activeFilterBtn,
  auth: state.auth,
  savedRecipes: state.savedRecipes.recipes,
  myRecipes: state.myRecipes.recipes,
  isFetching: state.savedRecipes.isFetching || state.myRecipes.isFetching
});

export default withRouter(
  connect(
    mapStateToProps,
    { getMyRecipes, getSavedRecipes, updateFilterRecipe }
  )(Home)
);
