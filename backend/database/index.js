const mongoose = require("mongoose");

require("dotenv").config();

// DB Config
const dbRoute = require("../config/keys").mongoURI;

// this is our MongoDB database
// const dbRoute = process.env.DB_ROUTE;

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the MongoDB"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
