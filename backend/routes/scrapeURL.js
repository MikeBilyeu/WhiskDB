const axios = require("axios");
const cheerio = require("cheerio");
const Router = require("express-promise-router");
const router = new Router();
const passport = require("passport");
module.exports = router;

const image_urlSelectors = [
  ".image-overlay img", // allrecipes.com new
  ".hero-photo__wrap img" // allrecipes.com
];
const titleSelectors = [
  ".recipe-container h1.heading-content", // allrecipes.com new
  "h1#recipe-main-content" // allrecipes.com
];

const servingsSelectors = [
  ".recipe-adjust-servings__size-quantity", // allrecipes.com new
  ".adjustServings .subtext" // allrecipes.com
];

const ingredientSelectors = [
  ".ingredients-item-name", // allrecipes.com new
  "[itemprop='recipeIngredient']" // allrecipes.com
];

const timeSelectors = [
  ".recipe-meta-container > div div:nth-child(3) div:last-child", // allrecipes.com new
  "[itemprop='totalTime']" // allrecipes.com
];

const directionsSelector = [
  ".instructions-section-item p", // allrecipes.com new
  ".recipe-directions__list--item" // allrecipes.com
];

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { user_id } = request.user;
    const { URL } = request.query;

    const { data: html } = await axios.get(URL);
    const $ = await cheerio.load(html);
    // {
    //   normalizeWhitespace: false;
    // }

    //we need to check if the recipe can even be parsed
    // iterate over array of 'recipe selectors' or check url
    // if recipe can be parsed run the scrapefunction

    const image_url = $(".icon-image-zoom").attr("data-image"); // allrecipes.com new
    //  const image_url = $(".hero-photo__wrap img").attr("src"); // allrecipes.com

    const title = $(".recipe-container h1.heading-content").text();

    const servings = $(".recipe-adjust-servings__size-quantity").text();

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
    ).text();
    //console.log(time);
    //split the time into hours and minutes

    let directions = "";

    $(".instructions-section-item p").each((i, e) => {
      directions +=
        $(e)
          .text()
          .trim() + " \n\n";
      // .replace(/\s\s+/g, "\n\n");
    });
    const recipe = {
      image_url,
      title,
      servings,
      ingredients,
      time,
      directions
    };
    response.status(200).json(recipe);
  }
);
