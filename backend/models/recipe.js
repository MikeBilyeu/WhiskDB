
const mongoose = require("mongoose");

// Recipe Schema
const recipe = new mongoose.Schema(
  {
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
    imageURL: String,
    user_id: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Recipe", recipe);
