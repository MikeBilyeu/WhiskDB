const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const createUser = require("./queries/createUser").createUser;
const userLogin = require("./queries/userLogin").userLogin;
const createRecipe = require("./queries/createRecipe").createRecipe;
const getRecipe = require("./queries/getRecipe").getRecipe;
const voteRecipe = require("./queries/voteRecipe").voteRecipe;
const saveRecipe = require("./queries/saveRecipe").saveRecipe;
const getSavedRecipes = require("./queries/getSavedRecipes").getSavedRecipes;
const getBrowseRecipes = require("./queries/getBrowseRecipes").getBrowseRecipes;
const getSearchRecipes = require("./queries/getSearchRecipes").getSearchRecipes;
const getUsernames = require("./queries/getUsernames").getUsernames;
const getEmails = require("./queries/getEmails").getEmails;
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

app.post("/register", createUser);

app.post("/login", userLogin);

app.post("/profile/create-recipe", createRecipe);

app.get("/recipe", getRecipe);

//post route for Liked_recips
app.post("/recipe/vote", voteRecipe);

// post route for saved recipes
app.post("/save-recipe", saveRecipe);

// get saved recipes
app.get("/save-recipe", getSavedRecipes);

// get Browse recipes
app.get("/browse-recipe", getBrowseRecipes);

// get Search recipes
app.get("/search-recipe", getSearchRecipes);

// Check if username is available
app.get("/usernames", getUsernames);

// Check if email is in use
app.get("/emails", getEmails);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
