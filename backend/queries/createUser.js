const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Connect to pool
const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: keys.port
});

const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInput = require("../validation/register");

const createUser = (request, response) => {
  const { username, email, password } = request.body;
  console.log("INPUT: ", username, email, password);

  // Form validation
  const { errors, isValid } = validateRegisterInput(request.body);
  // Check validation
  if (!isValid) {
    throw errors;
  }

  pool.connect().then(client => {
    return client
      .query("SELECT * FROM users WHERE username = $1 OR email = $2", [
        username,
        email
      ])
      .then(res => {
        if (res.rowCount > 0) {
          if (username === res.rows[0].username) {
            console.log("Username is already registered, Sorry");
            console.log(res.rows[0].username);
          } else if (email === res.rows[0].email) {
            console.log("This email is already registered, Want to Log in");
            console.log(res.rows[0].email);
          } else {
            console.log("username or email already registered, Sorry");
            console.log(res.rows[0]);
          }
          client.release();
        } else {
          console.log("Adding user to DB");
          console.log("Salt & Hashing password...");
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              password_encrypted = hash;
              client.query(
                "INSERT INTO users (username, email, password_encrypted) VALUES ($1, $2, $3)",
                [username, email, password_encrypted],
                (error, result) => {
                  if (error) {
                    client.release();
                    console.log("SERVER ERROR");
                    console.log(error);
                    throw error;
                  }
                  client.release();
                  response
                    .status(201)
                    .send(`User added with ID: ${result.insertId}`);
                  console.log("User successfully added to DB!");
                }
              );
            });
          });
        }
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });
};

module.exports = {
  createUser
};
