const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const createUser = require("./queries/createUser");
const userLogin = require("./queries/userLogin");
const createRecipe = require("./queries/createRecipe");
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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
