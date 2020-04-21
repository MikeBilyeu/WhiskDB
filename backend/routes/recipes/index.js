const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/browse", require("./browseRecipes"));

router.get("/search", require("./searchRecipes"));

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  require("./createRecipe")
);

router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  require("./editRecipe")
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  require("./deleteRecipe")
);

router.get("/rating", require("./recipeRating"));

router.get(
  "/my-review",
  passport.authenticate("jwt", { session: false }),
  require("./getMyReview")
);

router.get("/reviews", require("./getRecentReviews"));

router.get("/reviews", require("./getRecentReviews"));

router.post(
  "/reviews",
  passport.authenticate("jwt", { session: false }),
  require("./postReview")
);

router.post(
  "/save",
  passport.authenticate("jwt", { session: false }),
  require("./saveRecipe")
);

router.delete(
  "/unsave",
  passport.authenticate("jwt", { session: false }),
  require("./unsaveRecipe")
);

router.get(
  "/saved",
  passport.authenticate("jwt", { session: false }),
  require("./getSavedRecipes")
);

router.get("/recipe", require("./getRecipe"));

module.exports = router;
