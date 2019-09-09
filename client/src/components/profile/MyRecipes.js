import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import RecipeDisplayMini from "../recipes/recipe-display/RecipeDisplayMini";
import { getMyRecipes } from "../../actions/recipeActions";

class MyRecipes extends React.Component {
  componentDidMount() {
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getMyRecipes(user_id);
  }

  renderRecipeList = () => {
    return this.props.myRecipes.recipes.map((recipe, i) => {
      return <RecipeDisplayMini key={i} recipe={recipe} />;
    });
  };
  render() {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <Link to="/profile/create-recipe">
          <div
            style={{
              backgroundColor: "#0172C4",
              color: "#FFF",
              padding: ".8rem 5rem",
              margin: "1.5rem",
              fontWeight: "bold",
              borderRadius: "10rem"
            }}
          >
            Create Recipe
          </div>
        </Link>
        <h3>My Recipes</h3>
        <ul className="saved-recipes">{this.renderRecipeList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, myRecipes: state.myRecipes };
};

export default connect(
  mapStateToProps,
  { getMyRecipes }
)(MyRecipes);
