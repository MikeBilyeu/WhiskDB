const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const createUser = require("./queries/createUser");
const userLogin = require("./queries/userLogin");
const createRecipe = require("./queries/createRecipe");
const getRecipe = require("./queries/getRecipe");
const voteRecipe = require("./queries/voteRecipe");
const saveRecipe = require("./queries/saveRecipe");
const getSavedRecipes = require("./queries/getSavedRecipes");
const passport = require("passport");

// Parse middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.post("/register", createUser.createUser);

app.post("/login", userLogin.userLogin);

app.post("/profile/create-recipe", createRecipe.createRecipe);

app.get("/recipe", getRecipe.getRecipe);

//post route for Liked_recips
app.post("/recipe/vote", voteRecipe.voteRecipe);

// post route for saved recipes
app.post("/save-recipe", saveRecipe.saveRecipe);

// get saved recipes

app.get("/save-recipe", getSavedRecipes.getSavedRecipes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
