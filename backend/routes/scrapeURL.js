const axios = require("axios");
const cheerio = require("cheerio");
const Router = require("express-promise-router");
const router = new Router();
const passport = require("passport");
module.exports = router;

const titleSelectors = [
  ".recipe-container h1.heading-content",
  "h1#recipe-main-content" // allrecipes.com
];

const servingsSelectors = [
  ".recipe-adjust-servings__size-quantity",
  "[ng-bind='adjustedServings']" // allrecipes.com
];

const ingredientSelectors = [
  ".ingredients-item-name",
  ".recipe-ingred_txt" // allrecipes.com
];

const timeSelectors = [
  ".recipe-meta-container > div div:nth-child(3) div:last-child" // allrecipes.com
];

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user;
    const { URL } = request.query;

    const { data: html } = await axios.get(URL);
    const $ = cheerio.load(html);

    //we need to check if the recipe can even be parsed
    // iterate over array of 'recipe selectors' or check url
    // if recipe can be parsed run the scrapefunction

    const title = $(".recipe-container h1.heading-content").text();

    const servings = $(".recipe-adjust-servings__size-quantity")
      .text()
      .trim();

    let ingredients = [];

    $(".ingredients-item-name").each((index, element) => {
      ingredients.push(
        $(element)
          .text()
          .replace(/\s\s+/g, " ")
          .trim()
      );
    });

    const time = $(
      ".recipe-meta-container > div div:nth-child(3) div:last-child"
    )
      .text()
      .replace(/\s\s+/g, " ")
      .trim();
    //split the time into hours and minutes

    const directions = $("ul").html();
    console.log(directions);

    const recipe = {
      title,
      servings,
      ingredients,
      time
    };
    response.status(200).json(recipe);
  }
);
