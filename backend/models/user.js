// User Schema
const mongoose = require("mongoose");

// This will create the schema for the user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password_encrypted: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  recipes: [],
  SavedRecipes: []
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("users", userSchema);
