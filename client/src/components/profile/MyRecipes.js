import React from "react";
import { Link } from "react-router-dom";

class MyRecipes extends React.Component {
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
        <div>My Recipes Component</div>
      </div>
    );
  }
}

export default MyRecipes;
