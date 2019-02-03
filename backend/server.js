const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const dbConnection = require("./database");
//
// const User = require('./database/models/user');


const API_PORT = 3001;
const app = express();



// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


// Routes
// Sign up
app.use("/sign-up", require('./routes/user'));

//Create Recipe
app.use("/create-recipe", require('./routes/recipe'));


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
