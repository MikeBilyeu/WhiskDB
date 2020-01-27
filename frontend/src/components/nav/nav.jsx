import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getBrowseRecipes } from "../../actions/browseActions";
import { getMyRecipes, getSavedRecipes } from "../../actions/recipeActions";
import { ReactComponent as Home } from "../../assets/images/search.svg";
import { ReactComponent as Profile } from "../../assets/images/profile.svg";

import "./nav.scss";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: ""
    };
  }
  componentDidMount() {
    this.setNavState();
  }

  // set state depending on url location
  componentWillReceiveProps(nextProps) {
    this.setNavState();
  }

  setNavState = () => {
    this.setState((prevState, props) => {
      const pathname = props.location.pathname;

      if (/profile|auth/.test(pathname)) {
        return { nav: "profile" };
      } else {
        return { nav: "home" };
      }
    });
  };

  handleProfileClick = () => {
    // this.props.getMyRecipes();
    // this.props.getSavedRecipes();
  };

  handleHomeClick = () => {
    //this.props.getBrowseRecipes();
  };

  render() {
    const recipePageURL = RegExp("^/recipe*");
    if (recipePageURL.test(this.props.location.pathname)) {
      return null;
    }
    return (
      <div className="navBar">
        <Link to="/">
          <Home
            className={
              "navIcon" + (this.state.nav === "home" ? " navActive" : "")
            }
          />
        </Link>

        <Link to="/profile">
          <Profile
            className={
              "navIcon" + (this.state.nav === "profile" ? " navActive" : "")
            }
          />
        </Link>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    { getMyRecipes, getSavedRecipes, getBrowseRecipes }
  )(Nav)
);
