const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
require("./config/passport")(passport);
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(passport.initialize());

// API Routes
app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
