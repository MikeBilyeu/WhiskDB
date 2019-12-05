const express = require("express");
const mountRoutes = require("./routes");
const cors = require("cors");
const app = express();
const passport = require("passport");
const PORT = process.env.PORT || 3001;

// Parse middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(passport.initialize());
app.use(cors());

// Passport config
require("./config/passport")(passport);

// Routes
mountRoutes(app);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    // Successful authentication, redirect profile.
    res.redirect("/profile");
  }
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
