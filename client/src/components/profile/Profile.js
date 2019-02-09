import React from "react";
import { Route } from "react-router-dom";
import CreateRecipe from "./CreateRecipe";
import SavedRecipes from "./SavedRecipes";
import MyRecipes from "./MyRecipes";
import Contact from "../Contact";
import EditProfile from "./EditProfile";
import Button from "../Button";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Button text="Create Recipe" linkTo="/profile/create-recipe" />
        <Button text="My Recipes" linkTo="/profile/my-recipes" />
        <Button text="Saved Recipes" linkTo="/profile/saved-recipes" />
        <div className="ui horizontal divider">Or</div>
        <Button text="Edit Profile" linkTo="/profile/edit" />
        <Button text="Contact Us" linkTo="/profile/contact" />

        <Route path={`/profile/create-recipe`} component={CreateRecipe} />
        <Route path={`/profile/saved-recipes`} component={SavedRecipes} />
        <Route path={`/profile/my-recipes`} component={MyRecipes} />
        <Route path={`/profile/edit`} component={EditProfile} />
        <Route path={`/profile/contact`} component={Contact} />
      </div>
    );
  }
}

export default Profile;
