const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3005;
const db = require("./queries");
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

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
