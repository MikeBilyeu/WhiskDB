const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
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
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");

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

const userLogin = (request, response) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(request.body);
  // Check validation
  if (!isValid) {
    return response.status(400).json(errors);
  }
  const email = request.body.email;
  const password = request.body.password;

  // Swap out mongodb for postgresql

  pool.connect().then(client => {
    return client
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then(res => {
        client.release();
        if (res.rowCount === 0) {
          return response
            .status(404)
            .json({ emailnotfound: "Email not found" });
        }
        const user = res.rows[0];
        // Check password
        bcrypt.compare(password, user.password_encrypted).then(isMatch => {
          if (isMatch) {
            console.log("User Matched");
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.username
            };
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                if (err) throw err;
                response.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return response
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      })
      .catch(e => {
        client.release();
        console.log(e);
      });
  });

  // FOR mongodb
  // Find user by email
  // User.findOne({ email }).then(user => {
  //   // Check if user exists
  //   if (!user) {
  //     return res.status(404).json({ emailnotfound: "Email not found" });
  //   }
  //   // Check password
  //   bcrypt.compare(password, user.password).then(isMatch => {
  //     if (isMatch) {
  //       // User matched
  //       // Create JWT Payload
  //       const payload = {
  //         id: user.id,
  //         name: user.name
  //       };
  //       // Sign token
  //       jwt.sign(
  //         payload,
  //         keys.secretOrKey,
  //         {
  //           expiresIn: 31556926 // 1 year in seconds
  //         },
  //         (err, token) => {
  //           res.json({
  //             success: true,
  //             token: "Bearer " + token
  //           });
  //         }
  //       );
  //     } else {
  //       return res
  //         .status(400)
  //         .json({ passwordincorrect: "Password incorrect" });
  //     }
  //   });
  // });
};

module.exports = {
  createUser,
  userLogin
};
