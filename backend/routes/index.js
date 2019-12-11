const createRecipe = require("./createRecipe");
const getEmails = require("./getEmails");
const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const editProfile = require("./editProfile");
const userLogin = require("./userLogin");
const editRecipe = require("./editRecipe");
const getRecipe = require("./getRecipe");
const saveRecipe = require("./saveRecipe");
const postReview = require("./postReview");
const getRatingDetails = require("./getRatingDetails");
const getUser = require("./getUser");
const getBrowseRecipes = require("./getBrowseRecipes");
const getUsernames = require("./getUsernames");
const getSavedRecipes = require("./getSavedRecipes");
const getMyRecipes = require("./getMyRecipes");
const getSearchRecipes = require("./getSearchRecipes");
const scrapeURL = require("./scrapeURL");

module.exports = app => {
  app.use("/profile/create-recipe", createRecipe);
  app.use("/emails", getEmails);
  app.use("/register", createUser);
  app.use("/delete-user", deleteUser);
  app.use("/edit-profile", editProfile);
  app.use("/login", userLogin);
  app.use("/profile/edit-recipe", editRecipe);
  app.use("/recipe", getRecipe);
  app.use("/save-recipe", saveRecipe);
  app.use("/recipe-review", postReview);
  app.use("/rating-details", getRatingDetails);
  app.use("/user", getUser);
  app.use("/browse-recipe", getBrowseRecipes);
  app.use("/usernames", getUsernames);
  app.use("/save-recipe", getSavedRecipes);
  app.use("/my-recipe", getMyRecipes);
  app.use("/search-recipe", getSearchRecipes);
  app.use("/scrape-url", scrapeURL);
  app.use((request, response, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
      error: {
        message: error.message
      }
    });
  });
};
