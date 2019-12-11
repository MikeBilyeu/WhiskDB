const axios = require("axios");
const cheerio = require("cheerio");
const Router = require("express-promise-router");
const router = new Router();
const passport = require("passport");
module.exports = router;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user;
    const { URL } = request.query;

    const { data: html } = await axios.get(URL);
    const $ = cheerio.load(html);

    const title = $(".recipe-container h1.heading-content").text();
    const recipe = {
      title
    };
    console.log(recipe);
    // response.status(200).json({ username: "Username is available" });
    response.status(200).json(recipe);
  }
);
