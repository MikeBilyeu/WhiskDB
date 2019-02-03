// User Schema
const mongoose = require("mongoose");

// This will create the schema for the user model
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", userSchema);
