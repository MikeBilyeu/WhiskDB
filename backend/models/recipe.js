const mongoose = require("mongoose");

// Recipe Schema
const recipe = new mongoose.Schema({
  rating: {
    upVotes: Number,
    downVotes: Number
  },
  title: String,
  servings: Number,
  ingredients: [
    {
      amount: Number,
      unit: String,
      ingredient: String
    }
  ],
  time: Number,
  directions: [],
  tips: String,
  tags: [],
  imageURL: String,
  user_id: String
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Recipe", recipe);
