import React from "react";
import classNames from "classnames";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getBrowseRecipes } from "../../actions/browseActions";
import { getMyRecipes, getSavedRecipes } from "../../actions/recipeActions";
import { ReactComponent as HomeIcon } from "../../assets/images/search.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/profile.svg";

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
      <MediaQuery maxDeviceWidth={649}>
        <div className="nav-bar">
          <Link to="/" className="nav-bar__link">
            <HomeIcon
              className={classNames("nav-bar__icon", {
                "nav-bar__icon--active": this.state.nav === "home"
              })}
            />
          </Link>

          <Link to="/profile" className="nav-bar__link">
            <ProfileIcon
              className={classNames("nav-bar__icon", {
                "nav-bar__icon--active": this.state.nav === "profile"
              })}
            />
          </Link>
        </div>
      </MediaQuery>
    );
  }
}
export default withRouter(
  connect(
    null,
    { getMyRecipes, getSavedRecipes, getBrowseRecipes }
  )(Nav)
);
