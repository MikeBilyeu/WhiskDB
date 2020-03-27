const express = require("express");
const path = require("path");
const mountRoutes = require("./routes");
const cors = require("cors");
const app = express();
const passport = require("passport");
// Passport config
require("./config/passport")(passport);
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(passport.initialize());
app.use(cors());

// Routes
mountRoutes(app);

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile"]
//   })
// );
//
// app.get(
//   "/auth/google/redirect",
//   passport.authenticate("google"),
//   (req, res) => {
//     // Successful authentication, redirect profile.
//     res.redirect("/profile");
//   }
// );

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
