import React from "react";
import { Route } from "react-router-dom";
import CreateRecipe from "./CreateRecipe";
import NewRecipe from "./createRecipe/NewRecipe";
import SavedRecipes from "./SavedRecipes";
import MyRecipes from "./MyRecipes";
import Contact from "../Contact";
import EditProfile from "./EditProfile";
import Button from "../Button";

class Profile extends React.Component {
  render() {
    const page = this.props.match.params.page;
    const path = this.props.match.url;
    switch (page) {
      case "create-recipe":
        return <Route path={path} component={NewRecipe} />;
      case "my-recipes":
        return <Route path={path} component={MyRecipes} />;
      case "saved-recipes":
        return <Route path={path} component={SavedRecipes} />;
      case "edit":
        return <Route path={path} component={EditProfile} />;
      case "contact":
        return <Route path={this.props.match.url} component={Contact} />;
      default:
        return (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              gridGap: "3rem"
            }}
          >
            <Button text="Create Recipe" linkTo="/profile/create-recipe" />
            <Button text="My Recipes" linkTo="/profile/my-recipes" />
            <Button text="Saved Recipes" linkTo="/profile/saved-recipes" />
            <Button text="Edit Profile" linkTo="/profile/edit" />
            <Button text="Contact Us" linkTo="/profile/contact" />
          </div>
        );
    }
  }
}

export default Profile;
