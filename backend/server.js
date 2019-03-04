const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PROT || 3001;
const db = require("./queries/queries");
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

app.post("/register", db.createUser);

app.post("/login", db.userLogin);

app.post("/profile/create-recipe", db.createRecipe);

app.listen(PORT, "192.168.1.15", () => {
  console.log(`App running on port ${PORT}.`);
});
