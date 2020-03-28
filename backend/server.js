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

app.get("/*", (req, res) => {
  res.send("<h1>Zipiwisk</h1>");
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend", "build")));
// }
//
// // Routes
// mountRoutes(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
