const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");

const users = require("./routes/api/users");

const dbConnection = require("./database");
// const User = require('./database/models/user');

const PORT = process.env.PORT || 3001;
const app = express();

// Parses the request body to be a readable json format
// Passport middleware
// app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Passport config
// require("./config/passport")(passport);

// Routes

// Routes
// app.use("/api/users", users);

// // Sign up
// app.use("/sign-up", require("./routes/user"));
//
// //Create Recipe
// app.use("/create-recipe", require("./routes/recipe"));

// launch our backend into a port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
