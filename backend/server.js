// const express = require("express");
// const bodyParser = require("body-parser");
// const logger = require("morgan");
// const passport = require("passport");
//
// const users = require("./routes/api/users");
//
// const dbConnection = require("./database");
// // const User = require('./database/models/user');
//
// const PORT = process.env.PORT || 3001;
// const app = express();
//
// // Parses the request body to be a readable json format
// // Passport middleware
// // app.use(passport.initialize());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger("dev"));
//
// // Passport config
// // require("./config/passport")(passport);
//
// // Routes
// app.get("/", (request, response) => {
//   response.json({ info: "Node.js, Express, and Postgres API" });
// });
//
// // Routes
// // app.use("/api/users", users);
//
// // // Sign up
// // app.use("/sign-up", require("./routes/user"));
// //
// // //Create Recipe
// // app.use("/create-recipe", require("./routes/recipe"));
//
// // launch our backend into a port
// app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/hello", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/register", db.createUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
