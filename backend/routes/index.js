const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


// User model
const User = require('../models/user');


// Handle post request to /sign-up
router.post("/sign-up", (req, res) => {
  // Get data from req
  const {
    firstName,
    lastName,
    email,
    password,
    password2
  } = req.body;

  // Errors for validation
  let errors = [];

  // Validate the user input

  // Check that all field are filled out
  if(!firstName || !lastName || !email || !password || !password2) {
    errors.push({ msg: 'Please fill out all fields'});
  }
  // Check that both passwords are a match
  if(password !== password2) {
    errors.push({ msg: 'Passwords do not match'});
  }
  // Check password length
  if(password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters'});
  }

  //Check for errors
  if(errors.length > 0) {
    console.log('Error: ',errors);
  } else {

    // Passed validation
    // Check if email is already registered
    User.findOne({ email: email })
    .then(user => {
      if(user){
        // User already exists
        errors.push({ msg: 'This Eamil is already used'})
        console.log('Error: ', errors);
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          //set password to hash
          newUser.password = hash;
          //save user
          newUser.save()
            .then(console.log('Saving new user to DB...'))
            .catch(err => console.log(err));
        }));
      }
    });

  }


});

module.exports = router;
