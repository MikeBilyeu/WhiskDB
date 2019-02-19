const Pool = require("pg").Pool;
const keys = require("./config/keys");
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("./validation/register");

const createUser = (request, response) => {
  const { username, email, password } = request.body;
  console.log("INPUT: ", username, email, password);

  // Form validation
  const { errors, isValid } = validateRegisterInput(request.body);
  // Check validation
  if (!isValid) {
    console.log("Error: ", errors);
    return res.status(400).json(errors);
  }

  // Hash password before saving in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      password_encrypted = hash;
      pool.query(
        "INSERT INTO users (username, email, password_encrypted) VALUES ($1, $2, $3)",
        [username, email, password_encrypted],
        (error, result) => {
          if (error) {
            console.log("SERVER ERR");
            console.log(error);
            throw error;
          }
          response.status(201).send(`User added with ID: ${result.insertId}`);
        }
      );
    });
  });
};

module.exports = {
  createUser
};
