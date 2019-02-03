const express = require('express');
const router = express.Router();

// Recipe model
const Recipe = require('../models/recipe');


// Handle post request to /sign-up
router.post("/", (req, res) => {
  // Get data from req
  console.log(req.body);

  // Errors for validation
  let errors = [];

  // Validate the user input

  



});

module.exports = router;
