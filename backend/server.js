const express = require("express");
const app = express();
const morgan = require("morgan");
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

app.use(morgan("dev"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname));
  app.use(express.static(path.join(__dirname, "../frontend/build")));
}

// API Routes
app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
