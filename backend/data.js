// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const recipeSchema = new Schema(
  {
    userName: String,
    totalVotes: Number,
    upVotes: Number,
    downVotes: Number,
    rating: Number,
    title: String,
    servings: Number,
    ingredients: [],
    time: Number,
    directions: [],
    tips: String,
    tags: [],
    imageURL: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", recipeSchema);
