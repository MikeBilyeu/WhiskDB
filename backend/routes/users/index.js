const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  require("./getUser")
);

router.post("/user", require("./createUser"));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  require("./googleLogin")
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  require("./deleteUser")
);

router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  require("./editProfile")
);

router.get("/emails", require("./getEmails"));

router.get("/usernames", require("./getUsernames"));

router.post("/login", require("./userLogin"));

module.exports = router;
