import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Loading } from "../loading/Loading";
import RecipeDisplay from "../recipes/recipe-display/RecipeDisplay";
import { ReactComponent as Arrow } from "./filterArrow.svg";

// action Creator
import { getSavedRecipes } from "../../actions/recipeActions";

class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortActive: false
    };
  }
  componentDidMount() {
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getSavedRecipes(user_id);
  }

  renderRecipeList = () => {
    return this.props.recipes.recipes.map((recipe, i) => {
      return (
        <Link key={`recipe${i}`} to={`/recipe/${recipe.recipe_id}`}>
          <RecipeDisplay recipe={recipe} />
        </Link>
      );
    });
  };
  handleClick = () => {
    this.setState(prevState => {
      return { sortActive: !prevState.sortActive };
    });
  };

  render() {
    const { recipes, isFetching } = this.props.recipes;
    let style = {
      width: "7rem",
      borderRadius: ".2rem",
      cursor: "pointer",
      backgroundColor: "#313131",
      color: "#FFFFFF",
      textAlign: "center",
      fontSize: "1.2rem",
      margin: "1rem",
      padding: ".6rem",
      transition: "all .2s ease-out",
      justifySelf: "end"
    };
    let arrowStyle = {
      width: ".8rem",
      transition: "all .2s ease-out",
      marginLeft: ".4rem"
    };

    if (isFetching) {
      return <Loading />;
    }

    if (this.state.sortActive) {
      arrowStyle = { ...arrowStyle, transform: "rotate(90deg)" };
    }

    return (
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            placeItems: "center",
            borderBottom: "solid #BFBFBF .01rem",
            marginLeft: "1rem",
            userSelect: "none",
            MozUserSelect: "none",
            WebkitUserSelect: "none",
            MsUserSelect: "none"
          }}
        >
          <h1>Saved Recipes</h1>
          <div style={style} onClick={this.handleClick}>
            Sort
            <Arrow style={arrowStyle} />
          </div>
        </div>
        <ul style={{ listStyleType: "none" }}>{this.renderRecipeList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipes: state.savedRecipes
});

export default connect(
  mapStateToProps,
  { getSavedRecipes }
)(SavedRecipes);
