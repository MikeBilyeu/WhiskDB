import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getMyRecipes,
  getSavedRecipes,
  toggleSortButton
} from "../../../actions/recipeActions";
import Header from "./header";
import PageToggle from "./header/page-toggle";
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
    this.props.getMyRecipes();
    this.props.getSavedRecipes();
  }

  handlePageClick = page => {
    this.setState(prevState => {
      if (prevState.page !== page) {
        return { page };
      }
    });
  };

  render() {
    const { page } = this.state;
    const { full_name } = this.props.auth.user;
    const { recipes: savedRecipes } = this.props.savedRecipes;
    const { recipes: myRecipes } = this.props.myRecipes;
    return (
      <div className="profile">
        <Header fullName={full_name} />
        <PageToggle page={this.state.page} onClick={this.handlePageClick} />
        {page === "saved" ? (
          <Results recipes={savedRecipes} isFetching={null} />
        ) : (
          <Results recipes={myRecipes} isFetching={null} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  savedRecipes: state.savedRecipes,
  myRecipes: state.myRecipes
});

export default withRouter(
  connect(
    mapStateToProps,
    { getMyRecipes, getSavedRecipes, toggleSortButton }
  )(Home)
);
