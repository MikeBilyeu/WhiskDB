const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PROT || 3001;
const createUser = require("./queries/createUser");
const userLogin = require("./queries/userLogin");
const createRecipe = require("./queries/createRecipe");
const passport = require("passport");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
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

app.listen(PORT, "192.168.1.15", () => {
  console.log(`App running on port ${PORT}.`);
});
