import React from "react";
import "./results-no_results.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const NoResults = props => {
  if (props.location.pathname === "/profile") {
    return (
      <div className="no-results">
        <h1 className="no-results__title">
          {props.category === "All Categories"
            ? `You don't have any saved recipes.`
            : `You don't have any saved ${props.category.toLowerCase()} recipes.`}
        </h1>
        <h2 className="no-results__msg">
          Save or create recipes to see them here!
        </h2>
      </div>
    );
  } else {
    return (
      <div className="no-results">
        <h1 className="no-results__title">
          Sorry,
          <br /> we couldn't find any recipes{" "}
          <span style={{ whiteSpace: "nowrap" }}>:(</span>
        </h1>
        <h2 className="no-results__msg">
          Please try searching for another recipe!
        </h2>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  category: state.auth.filterRecipes.category
});

export default withRouter(connect(mapStateToProps)(NoResults));
