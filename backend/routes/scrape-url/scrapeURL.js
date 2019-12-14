const axios = require("axios");
const cheerio = require("cheerio");
const Router = require("express-promise-router");
const router = new Router();
const passport = require("passport");
const { searchData, findRecipe } = require("./utils");
module.exports = router;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user;
    const { URL } = request.query;
    const { data: html } = await axios.get(URL);
    const $ = await cheerio.load(html);

    let recipeData = {};

    $("script[type='application/ld+json']").each((i, e) => {
      const data = JSON.parse($(e).get()[0].children[0].data);
      recipeData = findRecipe(data);
      if (recipeData) {
        // recipe found now exit .each loop with false
        return false;
      }
    });
    console.log(recipeData);

    if (Object.keys(recipeData).length) {
      //
      // // need to join categores array into keywords
      //
      // const image_url = recipeData.image[0];
      //
      // let directions = "";
      //
      // if (Array.isArray(recipeInstructions)) {
      //   recipeInstructions.forEach(obj => {
      //     directions += obj.text + "  ";
      //   });
      // } else {
      //   directions = recipeInstructions;
      // }
      //
      // directions = directions
      //   .split(/\s\s+/g)
      //   .join("\n\n")
      //   .replace(/^ +|[, ]+$/gm, "");
      //

      // response.status(200).json(recipe);
      return;
    }
  }
);
