const path = require("path");
const createRecipe = require("./createRecipe");
const getEmails = require("./getEmails");
const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const editProfile = require("./editProfile");
const userLogin = require("./userLogin");
const editRecipe = require("./editRecipe");
const getRecipe = require("./getRecipe");
const saveRecipe = require("./saveRecipe");
const getRecipeReview = require("./getRecipeReview");
const postReview = require("./postReview");
const getRatingPercentage = require("./getRatingPercentage");
const getUser = require("./getUser");
const getBrowseRecipes = require("./getBrowseRecipes");
const getUsernames = require("./getUsernames");
const getSavedRecipes = require("./getSavedRecipes");
const getSearchRecipes = require("./getSearchRecipes");
const scrapeURL = require("./scrape-url/scrapeURL");

module.exports = app => {
  app.get("/*", (req, res) => {
    //res.sendFile("/frontend/build/index.html");
    console.log("dirname: ", __dirname);
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
  // app.use("/profile/create-recipe", createRecipe);
  // app.use("/emails", getEmails);
  // app.use("/register", createUser);
  // app.use("/delete-user", deleteUser);
  // app.use("/edit-profile", editProfile);
  // app.use("/login", userLogin);
  // app.use("/profile/edit-recipe", editRecipe);
  // app.use("/recipe", getRecipe);
  // app.use("/recipe/save", saveRecipe);
  // app.use("/recipe/saved", getSavedRecipes);
  // app.use("/recipe/review", postReview);
  // app.use("/recipe/review", getRecipeReview);
  // app.use("/rating-percentage", getRatingPercentage);
  // app.use("/user", getUser);
  // app.use("/browse-recipe", getBrowseRecipes);
  // app.use("/usernames", getUsernames);
  // app.use("/search-recipe", getSearchRecipes);
  // app.use("/scrape-url", scrapeURL);

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
