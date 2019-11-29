const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const createUser = require("./queries/createUser").createUser;
const userLogin = require("./queries/userLogin").userLogin;
const createRecipe = require("./queries/createRecipe").createRecipe;
const editRecipe = require("./queries/editRecipe").editRecipe;
const getRecipe = require("./queries/getRecipe").getRecipe;
const saveRecipe = require("./queries/saveRecipe").saveRecipe;
const getSavedRecipes = require("./queries/getSavedRecipes").getSavedRecipes;
const getMyRecipes = require("./queries/getMyRecipes").getMyRecipes;
const getBrowseRecipes = require("./queries/getBrowseRecipes").getBrowseRecipes;
const getSearchRecipes = require("./queries/getSearchRecipes").getSearchRecipes;
const getUsernames = require("./queries/getUsernames").getUsernames;
const getEmails = require("./queries/getEmails").getEmails;
const editProfile = require("./queries/editProfile").editProfile;
const getUser = require("./queries/getUser").getUser;
const postReview = require("./queries/postReview").postReview;
const getRatingDetails = require("./queries/getRatingDetails").getRatingDetails;
const deleteUser = require("./queries/deleteUser").deleteUser;

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

// routes
app.post("/register", createUser);

app.post("/login", userLogin);

app.post(
  "/profile/create-recipe",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);

app.put(
  "/profile/edit-recipe",
  passport.authenticate("jwt", { session: false }),
  editRecipe
);

app.get("/recipe", getRecipe);

// post route for saved recipes
app.post(
  "/save-recipe",
  passport.authenticate("jwt", { session: false }),
  saveRecipe
);

// get saved recipes
app.get(
  "/save-recipe",
  passport.authenticate("jwt", { session: false }),
  getSavedRecipes
);

// get my recipes
app.get(
  "/my-recipe",
  passport.authenticate("jwt", { session: false }),
  getMyRecipes
);

// get Browse recipes
app.get("/browse-recipe", getBrowseRecipes);

// get Search recipes
app.get("/search-recipe", getSearchRecipes);

// Check if username is available
app.get("/usernames", getUsernames);

// Check if email is in use
app.get("/emails", getEmails);

// get user
app.get("/user", passport.authenticate("jwt", { session: false }), getUser);

// Check if email is in use
app.post(
  "/edit-profile",
  passport.authenticate("jwt", { session: false }),
  editProfile
);

// post review
app.post(
  "/recipe-review",
  passport.authenticate("jwt", { session: false }),
  postReview
);

app.delete(
  "/delete-user",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

app.get("/rating-details", getRatingDetails);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
  }
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
