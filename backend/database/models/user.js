// User Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String

  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Userd", userSchema);
