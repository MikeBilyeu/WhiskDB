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
const validateLoginInput = require("../validation/login");

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
        console.log(user);
        // Check password
        bcrypt.compare(password, user.password_encrypted).then(isMatch => {
          if (isMatch) {
            console.log("User Matched");
            // User matched
            // Create JWT Payload
            const payload = {
              user_id: user.user_id,
              username: user.username
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
};

const createRecipe = (request, response) => {
  const {
    title,
    servings,
    time,
    footnote,
    private,
    directions,
    ingredients,
    created_by
  } = request.body;

  const timeHours = time.hours > 0 ? time.hours : 0;
  const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
  const total_time_mins = timeHours * 60 + timeMinutes;
  console.log("REQ: ", request.body);

  // pool.connect().then(client => {
  //   return client
  //     .query(
  //       "INSERT INTO recipes (created_by, title, servings, total_time_mins, footnote, private, directions, ingredients) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
  //       [
  //         created_by,
  //         title,
  //         servings,
  //         total_time_mins,
  //         footnote,
  //         private,
  //         directions,
  //         ingredients
  //       ]
  //     )
  //     .then(res => {
  //       console.log("QUERY RES: ", res);
  //       for (let i = 0; i < ingredients.length; i++) {
  //         let { ingredient } = ingredients[i];
  //         client
  //           .query("INSERT INTO ingredients (ingredient_name) VALUES ($1)", [
  //             ingredient
  //           ])
  //           .then(res => {
  //             response.status(201).send("recipe added to db");
  //           })
  //           .catch(e => console.error(e));
  //       }
  //
  //       console.log("Recipe added to database");
  //       client.release();
  //     })
  //     .catch(e => {
  //       client.release();
  //       console.log(e);
  //     });
  // });
};

module.exports = {
  createUser,
  userLogin,
  createRecipe
};
