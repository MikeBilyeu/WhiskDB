const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
require("./config/passport")(passport);
require("./config/googlePassport")(passport);
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: [
      "http://zipiwhisk.com",
      "https://zipiwhisk.herokuapp.com",
      "http://localhost:3000"
    ], // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(passport.initialize());

app.use(morgan("dev"));

// API Routes
app.use(require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname));
  app.use(express.static(path.join(__dirname, "../frontend/build")));
}

// errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
